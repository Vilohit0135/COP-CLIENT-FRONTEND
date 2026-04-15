import ArticleDetailPage from "@/app/components/pages/articles/ArticleDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | CollegeProgram`,
    description: "Read this article on CollegeProgram — expert insights on education and career growth.",
  };
}

export default async function ArticleDetailRoute({ params }: Props) {
  const { slug } = await params;
  return <ArticleDetailPage slug={slug} />;
}
