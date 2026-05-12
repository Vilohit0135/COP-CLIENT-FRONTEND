import ArticlesPage from "@/app/components/pages/articles/Articles";
import { getBlogList } from "@/app/lib/blogs";

export const revalidate = 300;

export const metadata = {
  title: "Articles | CollegeProgram",
  description: "Latest blogs, guides and resources on education and career growth.",
};

export default async function ArticlesRoute() {
  const { articles, pageTitle, pageSubtitle } = await getBlogList();

  return (
    <ArticlesPage
      cmsArticles={articles}
      pageTitle={pageTitle}
      pageSubtitle={pageSubtitle}
    />
  );
}
