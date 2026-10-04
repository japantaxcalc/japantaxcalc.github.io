import type { ReactNode } from "react";
import { Link } from "wouter";

// A small Markdown reader for the blog posts in src/content/blog.
// It only supports what the posts use: "## " sections, paragraphs, "- " and "1. " lists,
// tables, **bold** and [links](/path). Edit the .md files on GitHub and the pages update.

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export interface MdSection {
  title?: string;
  blocks: Block[];
}

export function parseFrontmatter(raw: string) {
  const text = raw.replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  const data: Record<string, string> = {};
  if (!match) return { data, body: text };
  for (const line of match[1]!.split("\n")) {
    const i = line.indexOf(": ");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 2).trim();
  }
  return { data, body: text.slice(match[0].length) };
}

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

export function parseSections(body: string): MdSection[] {
  const sections: MdSection[] = [{ blocks: [] }];
  let current = sections[0]!;
  let para: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let table: string[][] | null = null;

  const flush = () => {
    if (para.length) current.blocks.push({ type: "p", text: para.join("") });
    if (list) current.blocks.push(list);
    if (table) {
      // second row is the |---|---| separator
      current.blocks.push({ type: "table", head: table[0]!, rows: table.slice(2) });
    }
    para = [];
    list = null;
    table = null;
  };

  for (const raw of body.split("\n")) {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      flush();
      current = { title: line.slice(3).trim(), blocks: [] };
      sections.push(current);
    } else if (line.startsWith("### ")) {
      flush();
      current.blocks.push({ type: "h3", text: line.slice(4).trim() });
    } else if (line.trim() === "") {
      flush();
    } else if (line.startsWith("|")) {
      if (!table) {
        flush();
        table = [];
      }
      table.push(cells(line));
    } else if (/^- /.test(line) || /^\d+\. /.test(line)) {
      const type = line.startsWith("- ") ? "ul" : "ol";
      if (!list || list.type !== type) {
        flush();
        list = { type, items: [] };
      }
      list.items.push(line.replace(/^(- |\d+\. )/, ""));
    } else {
      if (list || table) flush();
      para.push(line.trim());
    }
  }
  flush();
  return sections.filter((s) => s.title || s.blocks.length);
}

const linkClass = "font-medium text-[var(--jp-accent)] underline";

export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      parts.push(
        <b key={m.index} className="text-[var(--jp-ink)]">
          {m[1]}
        </b>,
      );
    } else if (m[3]!.startsWith("/")) {
      parts.push(
        <Link key={m.index} href={m[3]!} className={linkClass}>
          {m[2]}
        </Link>,
      );
    } else {
      parts.push(
        <a key={m.index} href={m[3]} target="_blank" rel="noreferrer" className={linkClass}>
          {m[2]}
        </a>,
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function MarkdownBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "p")
          return (
            <p key={i}>
              <Inline text={b.text} />
            </p>
          );
        if (b.type === "h3")
          return (
            <h3 key={i} className="font-semibold text-[var(--jp-ink)]">
              <Inline text={b.text} />
            </h3>
          );
        if (b.type !== "table") {
          const List = b.type;
          return (
            <List
              key={i}
              className={`${b.type === "ul" ? "list-disc" : "list-decimal"} space-y-1 pl-5`}
            >
              {b.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </List>
          );
        }
        return (
          <div key={i} className="overflow-x-auto rounded-xl border border-[var(--jp-border)]">
            <table className="w-full min-w-[420px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[var(--jp-accent-soft)]">
                  {b.head.map((h, j) => (
                    <th key={j} className="px-4 py-3 font-semibold text-[var(--jp-ink)]">
                      <Inline text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, j) => (
                  <tr key={j} className="border-t border-[var(--jp-border)]">
                    {row.map((cell, k) => (
                      <td key={k} className="px-4 py-3 text-[var(--jp-ink-muted)]">
                        <Inline text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
