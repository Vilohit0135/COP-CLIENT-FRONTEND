import { getPageContent } from "@/app/lib/api";
import type { PageResponse } from "@/app/lib/types";
import type { ArticleData } from "@/app/components/pages/articles/Articles";
import type {
  ArticleDetailData,
  ArticleBlock,
} from "@/app/components/pages/articles/ArticleDetail";

// Page slug under which blog posts live in the CMS.
// Editors can also try renaming the page to any of the fallback slugs.
const CANDIDATE_PAGE_SLUGS = [
  "blogs-and-resources",
  "blogs_and_resources",
  "blogs",
  "blog",
  "articles",
  "resources",
];

const FALLBACK_HERO_IMAGE = "/Blogs.webp";
const FALLBACK_AUTHOR_AVATAR = "/Image (Dr. Priya Sharma).webp";

// ── Normalize keys/aliases so spaces, underscores, and case all match ───────

function normKey(s: string): string {
  return s.toLowerCase().replace(/[\s_]+/g, "_").trim();
}

function richTextToPlain(value: any): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value?.type === "doc" && Array.isArray(value.content)) {
    return value.content.map(blockToPlain).filter(Boolean).join("\n\n");
  }
  if (Array.isArray(value)) return value.map(richTextToPlain).filter(Boolean).join("\n");
  return "";
}

function blockToPlain(block: any): string {
  if (!block) return "";
  if (block.type === "text") return block.text || "";
  if (block.type === "paragraph" || block.type === "heading") {
    return (block.content || []).map((c: any) => c.text || "").join("");
  }
  if (block.type === "blockquote" || block.type === "bulletList" || block.type === "orderedList") {
    return (block.content || []).map(blockToPlain).filter(Boolean).join("\n");
  }
  if (block.type === "listItem") {
    return (block.content || []).map(blockToPlain).filter(Boolean).join(" ");
  }
  return "";
}

function getVal(values: Record<string, any>, ...aliases: string[]): string {
  for (const alias of aliases) {
    const want = normKey(alias);
    const key = Object.keys(values).find((k) => normKey(k) === want);
    if (key === undefined) continue;
    const v = values[key];
    if (v === undefined || v === null || v === "") continue;
    const plain = richTextToPlain(v).trim();
    if (plain) return plain;
  }
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Field parsers ────────────────────────────────────────────────────────────

// "Dr. Sarah Mitchell\nLearning & Workforce Development Coach" → name + role
// Also handles blank-line separators.
function parseAuthor(raw: string): { name: string; role: string } {
  const text = raw.trim();
  if (!text) return { name: "", role: "" };
  const parts = text.split(/\r?\n\s*\r?\n|\r?\n/).map((p) => p.trim()).filter(Boolean);
  if (parts.length === 0) return { name: "", role: "" };
  return { name: parts[0], role: parts.slice(1).join(" — ") };
}

// "2026-05-08" → "May 8, 2026" (falls back to raw on parse failure)
function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(values: Record<string, any>): string {
  let words = 0;
  for (const v of Object.values(values)) {
    const text = richTextToPlain(v);
    if (text) words += text.split(/\s+/).filter(Boolean).length;
  }
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// "TECHNOLOGY\nSTRATEGY\nDIGITAL TRANSFORMATION" → ["TECHNOLOGY", "STRATEGY", "DIGITAL TRANSFORMATION"]
function parseTags(raw: string): string[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n|,|\|/)
    .map((t) => t.trim())
    .filter(Boolean);
}

// "1 The Paradigm Shift\n2 Hybrid Learning Model\n3 Key Takeaways" → TOC items
function parseTOC(raw: string): { id: string; label: string }[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^\d+[\.\)\s]+(.+)$/);
      const label = (match ? match[1] : line).trim();
      return { id: slugify(label), label };
    });
}

// Push a heading (first line) + paragraphs from a textarea field into blocks.
// First short non-terminating line is treated as the section heading.
function pushParagraphField(blocks: ArticleBlock[], raw: string): void {
  const text = raw.trim();
  if (!text) return;

  const lines = text.split(/\r?\n/);
  const firstNonEmptyIdx = lines.findIndex((l) => l.trim().length > 0);
  if (firstNonEmptyIdx < 0) return;
  const first = lines[firstNonEmptyIdx].trim();

  const looksLikeHeading =
    first.length > 0 &&
    first.length < 100 &&
    !/[.?!]$/.test(first) &&
    lines.slice(firstNonEmptyIdx + 1).some((l) => l.trim().length > 0);

  let bodyText: string;
  if (looksLikeHeading) {
    blocks.push({ type: "h2", id: slugify(first), text: first });
    bodyText = lines.slice(firstNonEmptyIdx + 1).join("\n");
  } else {
    bodyText = text;
  }

  const paragraphs = bodyText
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim().replace(/\s*\r?\n\s*/g, " "))
    .filter(Boolean);

  for (const p of paragraphs) {
    blocks.push({ type: "paragraph", text: p });
  }
}

// "Case Study: The Virtual Boardroom\n\nA thriving ed-tech company ran a..."
function parseCaseStudy(raw: string): ArticleBlock | null {
  const text = raw.trim();
  if (!text) return null;
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return null;

  let heading = "Case Study";
  let startIdx = 0;
  const first = lines[0];
  if (/^case\s*study\s*:/i.test(first)) {
    heading = first.replace(/^case\s*study\s*:\s*/i, "").trim() || "Case Study";
    startIdx = 1;
  } else if (/^case\s*study$/i.test(first)) {
    heading = lines[1] || "Case Study";
    startIdx = 2;
  }

  const rest = lines.slice(startIdx);
  const description: string[] = [];
  const bullets: string[] = [];

  for (const line of rest) {
    if (/^[•\-*]/.test(line)) {
      bullets.push(line.replace(/^[•\-*]\s*/, ""));
    } else if (bullets.length > 0) {
      bullets.push(line);
    } else {
      description.push(line);
    }
  }

  return {
    type: "casestudy",
    heading,
    description: description.join(" "),
    bullets,
  };
}

// "Key Takeaways\n• Time Blocking: ...\n• Prioritization: ..." → string[]
function parseTakeaways(raw: string): string[] {
  if (!raw) return [];
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length > 0 && /^key\s*takeaway/i.test(lines[0])) lines.shift();
  return lines.map((l) => l.replace(/^[•\-*]\s*/, "")).filter(Boolean);
}

// ── Per-section (= per-blog) mapping ─────────────────────────────────────────

interface BlogContext {
  sectionApiId: string;
  values: Record<string, any>;
}

function titleFor(ctx: BlogContext): string {
  return (
    getVal(ctx.values, "title", "main_heading", "heading", "name", "article_title") ||
    ""
  );
}

function slugFor(ctx: BlogContext): string {
  const explicit = getVal(ctx.values, "slug", "article_slug", "url_slug", "permalink");
  if (explicit) return slugify(explicit);
  // Derive from section apiIdentifier (underscores → hyphens)
  return ctx.sectionApiId.replace(/_/g, "-").toLowerCase();
}

function ctxToCard(ctx: BlogContext): ArticleData | null {
  const title = titleFor(ctx);
  if (!title) return null;
  const v = ctx.values;
  const author = parseAuthor(
    getVal(v, "about_author", "author", "author_name", "by")
  );
  return {
    slug: slugFor(ctx),
    category: getVal(v, "category", "categories"),
    date: formatDate(getVal(v, "date", "date_and_time", "publish_date", "published_date")),
    readTime: estimateReadTime(v),
    title,
    description: getVal(
      v,
      "description",
      "blog_description",
      "description_of_blog",
      "excerpt",
      "summary",
      "short_description"
    ),
    author: author.name,
    image:
      getVal(v, "main_image", "image", "hero_image", "cover", "cover_image", "thumbnail") ||
      FALLBACK_HERO_IMAGE,
  };
}

function ctxToDetail(ctx: BlogContext): ArticleDetailData | null {
  const title = titleFor(ctx);
  if (!title) return null;
  const v = ctx.values;
  const author = parseAuthor(
    getVal(v, "about_author", "author", "author_name", "by")
  );

  const body: ArticleBlock[] = [];

  const firstPara = getVal(v, "first_paragraph");
  if (firstPara) pushParagraphField(body, firstPara);

  const quote = getVal(v, "quote", "big_pill");
  if (quote) {
    const stripped = quote.replace(/^["“”']+|["“”']+$/g, "");
    body.push({ type: "quote", text: `"${stripped}"` });
  }

  const secondPara = getVal(v, "second_paragraph");
  if (secondPara) pushParagraphField(body, secondPara);

  const caseStudyRaw = getVal(v, "case_study");
  if (caseStudyRaw) {
    const cs = parseCaseStudy(caseStudyRaw);
    if (cs) body.push(cs);
  }

  const takeawaysRaw = getVal(v, "key_takeaways", "key_takeaway");
  const takeaways = parseTakeaways(takeawaysRaw);
  if (takeaways.length > 0) {
    body.push({
      type: "h3",
      id: slugify("Key Takeaways"),
      text: "Key Takeaways",
    });
    body.push({ type: "takeaways", items: takeaways });
  }

  const tableOfContents = parseTOC(getVal(v, "content_box", "table_of_contents", "toc"));

  const tags = parseTags(
    getVal(v, "key_takeaway_pills", "key_takeaways_pill", "key_takeaway_pill", "tags", "keywords")
  );

  return {
    slug: slugFor(ctx),
    category: getVal(v, "category", "categories", "main_pill"),
    title,
    authorName: author.name,
    authorRole: author.role,
    authorAvatar:
      getVal(v, "author_image", "author_avatar", "author_photo", "avatar", "photo") ||
      FALLBACK_AUTHOR_AVATAR,
    date: formatDate(getVal(v, "date", "date_and_time", "publish_date", "published_date")),
    readTime: estimateReadTime(v),
    heroImage:
      getVal(v, "main_image", "image", "hero_image", "cover", "cover_image", "thumbnail") ||
      FALLBACK_HERO_IMAGE,
    tags,
    tableOfContents,
    body,
  };
}

// ── Enumerate (section, content-item) pairs as blog candidates ───────────────

function enumerateBlogs(data: PageResponse): BlogContext[] {
  const sections = data.page?.sections || [];
  const content = data.content || [];
  const blogs: BlogContext[] = [];
  for (const section of sections) {
    const items = content
      .filter((c) => c.sectionApiId === section.apiIdentifier)
      .sort((a, b) => (a.itemIndex || 0) - (b.itemIndex || 0));
    for (const item of items) {
      blogs.push({
        sectionApiId: section.apiIdentifier,
        values: item.values || {},
      });
    }
  }
  return blogs;
}

// ── Fetch ────────────────────────────────────────────────────────────────────

async function fetchBlogPage(): Promise<PageResponse | null> {
  for (const slug of CANDIDATE_PAGE_SLUGS) {
    try {
      const data: PageResponse = await getPageContent(slug);
      if (data?.page) return data;
    } catch {
      // Try next slug
    }
  }
  return null;
}

export interface BlogListResult {
  articles: ArticleData[];
  pageTitle?: string;
  pageSubtitle?: string;
}

export async function getBlogList(): Promise<BlogListResult> {
  const data = await fetchBlogPage();
  if (!data) return { articles: [] };

  const blogs = enumerateBlogs(data);
  const articles = blogs
    .map(ctxToCard)
    .filter((a): a is ArticleData => a !== null);

  return { articles };
}

export interface BlogDetailResult {
  article: ArticleDetailData;
  relatedArticles: ArticleData[];
}

export async function getBlogBySlug(slug: string): Promise<BlogDetailResult | null> {
  const data = await fetchBlogPage();
  if (!data) return null;

  const blogs = enumerateBlogs(data);
  const target = blogs.find((b) => slugFor(b) === slug);
  if (!target) return null;

  const article = ctxToDetail(target);
  if (!article) return null;

  const relatedArticles = blogs
    .filter((b) => b !== target)
    .map(ctxToCard)
    .filter((a): a is ArticleData => a !== null)
    .slice(0, 3);

  return { article, relatedArticles };
}
