import { ArticleCard } from "@/components/ArticleCard";

import Layout from "@/components/Layout";

import { Article } from "@/entity/Article";
import { Category } from "@/entity/Category";
import { microcms } from "@/libs/microcms";
import { Pagination } from "@mantine/core";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";

type CategoryProps = {
  category: Category;
  banners: Banner[];
  categories: Category[];
  result: MicroCMSListResponse<Article>;
};

export default function Category({
  category,
  banners,
  categories,
  result,
}: CategoryProps) {
  return (
    <Layout banners={banners} categories={categories}>
      <h3 className="text-xl font-bold col-span-2">#{category.name} の記事</h3>
      {result.contents.map((article) => (
        <div key={article.id}>
          <Link href={"/blogs/" + article.id}>
            <ArticleCard article={article} />
          </Link>
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

export const getStaticPaths = async () => {
  const data = await microcms.get({
    endpoint: "categories",
    queries: { fields: "id" },
  });

  const paths = data.contents.map(
    (content: any) => `/categories/${content.id}`
  );

  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const data = await microcms.get({
    endpoint: "blogs",
    queries: {
      filters: `category[equals]${context.params.id}`,
      limit: 6,
      orders: "-publishedAt",
    },
  });

  const categories = await microcms.get({
    endpoint: "categories",
  });

  const banners = await microcms.get({
    endpoint: "banners",
  });

  const category = categories.contents.find(
    (category: Category) => category.id === context.params.id
  );

  return {
    props: {
      category,
      banners: banners.contents,
      categories: categories.contents,
      result: data,
    },
  };
};
