import { ArticleCard } from "@/components/ArticleCard";
import Layout from "@/components/Layout";
import { Article } from "@/entity/Article";
import { microcms } from "@/libs/microcms";
import { Image, Pagination, TextInput } from "@mantine/core";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";

type BlogProps = {
  result: MicroCMSListResponse<Article>;
};

export default function Home({ result }: BlogProps) {
  return (
    <Layout>
      <h3 className="text-xl font-bold col-span-2">新着記事</h3>
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
    endpoint: "blogs",
    queries: { fields: "id" },
  });

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(data.totalCount / 6)).map(
    (id) => `/blogs/page/${id}`
  );

  return { paths, fallback: false };
};

// getStaticPros を実装
// context で変数を受ける
// context.params.id を取得して offset に利用する
export const getStaticProps = async (context: any) => {
  const data = await microcms.get({
    endpoint: "blogs",
    queries: {
      limit: 6,
      offset: (context.params.id - 1) * 6,
      orders: "-publishedAt",
    },
  });

  return {
    props: {
      result: data,
    },
  };
};
