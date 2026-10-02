import { useEffect } from "react";

// Canonical URLs always use the live domain, so pages prerendered on
// localhost (scripts/prerender.mjs) still point to the real site.
const SITE_URL = "https://japantaxcalc.github.io";

interface SeoOptions {
  title: string;
  description: string;
  jsonLd?: object | object[];
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// /guide/, /guide.html and /guide are the same page; canonical is always /guide
function cleanPath(pathname: string) {
  const path = pathname.replace(/\.html$/, "").replace(/\/+$/, "");
  return path === "" || path === "/index" ? "/" : path;
}

export function useSeo({ title, description, jsonLd }: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title}｜${"日本旅遊工具箱"}`;
    const url = SITE_URL + cleanPath(window.location.pathname);
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Remove structured data left by a previous page or by the prerendered HTML,
    // otherwise the same JSON-LD would appear twice.
    document.head.querySelectorAll("script[data-seo]").forEach((s) => s.remove());
    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      for (const item of items) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo", "");
        script.text = JSON.stringify(item);
        document.head.appendChild(script);
        scripts.push(script);
      }
    }

    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, jsonLd]);
}
