import { ArticleCard } from "@/components/ArticleCard";
import Layout from "@/components/Layout";
import { Article } from "@/entity/Article";
import { Category } from "@/entity/Category";
import { microcms } from "@/libs/microcms";
import { Pagination } from "@mantine/core";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";

type HomeProps = {
  result: MicroCMSListResponse<Article>;
  categories: Category[];
};

export default function Home({ result, categories }: HomeProps) {
  return (
    <Layout categories={categories}>
      <h3 className="text-xl font-bold col-span-2">新着記事</h3>
      {result.contents.map((article) => (
        <div key={article.id}>
          {/* <Link href={"/blogs/" + article.id}> */}
          <ArticleCard article={article} />
          {/* </Link> */}
        </div>
      ))}
      <div className="mt-16 col-span-2 mx-auto">
        <Pagination
          color="indigo"
          value={result.offset / 6 + 1}
          onChange={(value) => {
            console.log(value);
            window.location.href = "/blogs/page/" + value;
          }}
          total={result.totalCount / 6 + 1}
        />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const blogs = await microcms.get({
    endpoint: "blogs",
    queries: { limit: 6, orders: "-publishedAt" },
  });

  const categories = await microcms.get({
    endpoint: "categories",
  });

  return {
    props: {
      result: blogs,
      categories: categories.contents,
    },
  };
};
