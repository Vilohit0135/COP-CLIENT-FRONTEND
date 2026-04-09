const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getPageContent(slug: string) {
  // Use a short ISR window so published edits appear quickly in production
  const res = await fetch(`${API_BASE}/api/public/page-content/${slug}`, {
    next: { revalidate: 1 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch page: ${slug}`);
  }

  return res.json();
}
