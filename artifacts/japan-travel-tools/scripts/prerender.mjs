// Runs after `vite build` (see .github/workflows/deploy-pages.yml).
// Opens every page in headless Chrome and saves the rendered HTML, so each URL
// serves its own title, canonical and text before any JavaScript runs.
// This replaces the old step that copied the same empty index.html to every route.
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const APP = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(APP, "dist/public");
const SITE_URL = "https://japantaxcalc.github.io";
const PORT = 4173;

// Every blog post is a .md file in src/content/blog; its file name is the URL
const BLOG_POSTS = (await readdir(join(APP, "src/content/blog")))
  .filter((f) => f.endsWith(".md"))
  .map((f) => `/blog/${f.replace(/\.md$/, "")}`);

// Keep in sync with the <Route> list in src/App.tsx and public/sitemap.xml
const ROUTES = [
  "/",
  "/yen-to-twd",
  "/japan-card-fee",
  "/shopping-trip-estimator",
  "/guide",
  "/japan-tax-2026",
  "/japan-tax-8-vs-10",
  "/japan-duty-free-guide",
  "/japan-airport-tax-refund",
  "/about",
  "/privacy",
  "/contact",
  "/disclaimer",
  "/blog",
  ...BLOG_POSTS,
];

const TYPES = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
};

// Ads, analytics and web fonts are not page content. Blocking them keeps ad
// markup out of the saved HTML and makes the build faster and repeatable.
const BLOCKED =
  /googlesyndication|doubleclick|googletagmanager|google-analytics|googleadservices|fundingchoicesmessages|fonts\.googleapis|fonts\.gstatic/;

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.CHROME_BIN,
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  const found = candidates.find((p) => p && existsSync(p));
  if (!found) throw new Error("Chrome not found. Set CHROME_PATH to the Chrome executable.");
  return found;
}

// Every page starts from the original empty index.html (read before it is overwritten)
const TEMPLATE = await readFile(join(DIST, "index.html"));

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const type = TYPES[extname(path)];
  if (!type) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(TEMPLATE);
    return;
  }
  try {
    res.writeHead(200, { "Content-Type": type }).end(await readFile(join(DIST, path)));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((done) => server.listen(PORT, done));

const browser = await puppeteer.launch({ executablePath: findChrome(), args: ["--no-sandbox"] });
let failed = 0;
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setRequestInterception(true);
  page.on("request", (r) => (BLOCKED.test(r.url()) ? r.abort() : r.continue()));
  page.on("pageerror", (e) => console.error(`  page error: ${e.message}`));

  for (const route of ROUTES) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0" });
      // Done when the page heading is on screen and useSeo() has set this page's canonical
      await page.waitForFunction(
        (href) =>
          document.querySelector("#root h1") &&
          document.querySelector('link[rel="canonical"]')?.getAttribute("href") === href,
        { timeout: 15000 },
        SITE_URL + route,
      );
      const html = await page.content();
      if (route === "/") {
        await writeFile(join(DIST, "index.html"), html);
      } else {
        const name = route.slice(1);
        await mkdir(dirname(join(DIST, name)), { recursive: true }); // blog/ for /blog/<post>
        await writeFile(join(DIST, `${name}.html`), html); // serves /guide (and /guide.html)
        await mkdir(join(DIST, name), { recursive: true });
        await writeFile(join(DIST, name, "index.html"), html); // serves /guide/
      }
      console.log(`OK    ${route}  ${await page.title()}`);
    } catch (e) {
      failed++;
      console.error(`FAIL  ${route}  ${e.message}`);
    }
  }
} finally {
  await browser.close();
  server.close();
}

if (failed) {
  console.error(`${failed} page(s) failed to prerender; the site will not be deployed.`);
  process.exit(1);
}
console.log(`Prerendered ${ROUTES.length} pages.`);
