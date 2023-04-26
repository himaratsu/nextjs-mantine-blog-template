import { ArticleCard } from "@/components/ArticleCard";
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
    <>
      <header className="bg-gray-200">
        <div className="py-2 container mx-auto">
          <Link href="/">
            <h5 className="font-bold text-lg font-mono ml-0 hover:underline">
              microSite
            </h5>
          </Link>
        </div>
      </header>
      <main className="container mx-auto ">
        <Image
          src={`https://images.unsplash.com/photo-1682319298536-33ac5b48d772?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MjQwNzg1Nw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800`}
          alt="random image"
          height={240}
          className="w-full mt-2"
        />
        <div className="mt-16">
          <h3 className="text-xl font-bold">新着記事</h3>
          <div className="mt-8 flex flex-row gap-12">
            <div className="basis-3/4 grid grid-cols-2 gap-6">
              {result.contents.map((article) => (
                <div key={article.id}>
                  <Link href={"/blogs/" + article.id}>
                    <ArticleCard article={article} />
                  </Link>
                </div>
              ))}
              <div className="mt-16 col-span-2 mx-auto">
                <Pagination
                  value={result.offset / 6 + 1}
                  onChange={(value) => {
                    console.log(value);
                    window.location.href = "/blogs/page/" + value;
                  }}
                  total={result.totalCount / 6 + 1}
                />
              </div>
            </div>

            <aside className="basis-1/4">
              <SideBar />
            </aside>
          </div>
        </div>
      </main>
      <footer className="mt-32">
        <div className="bg-slate-800 py-16 text-center">
          <div className="text-white">フッター</div>
        </div>
      </footer>
    </>
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
