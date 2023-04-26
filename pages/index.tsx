import { ArticleCard } from "@/components/ArticleCard";
import { Header } from "@/components/Header";
import Layout from "@/components/Layout";
import { SideBar } from "@/components/SideBar";
import { Article } from "@/entity/Article";
import { microcms } from "@/libs/microcms";
import { Image, Pagination, TextInput } from "@mantine/core";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";

type HomeProps = {
  result: MicroCMSListResponse<Article>;
};

export default function Home({ result }: HomeProps) {
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

export const getStaticProps = async () => {
  const data = await microcms.get({
    endpoint: "blogs",
    queries: { limit: 6, orders: "-publishedAt" },
  });

  return {
    props: {
      result: data,
    },
  };
};
