import { ArticleCard } from "@/components/ArticleCard";
import { Article } from "@/entity/Article";
import { microcms } from "@/libs/microcms";
import { Image, Pagination, TextInput } from "@mantine/core";
import { MicroCMSListResponse } from "microcms-js-sdk";

type BlogProps = {
  result: MicroCMSListResponse<Article>;
};

export default function Home({ result }: BlogProps) {
  return (
    <>
      <main className="container mx-auto">
        <Image
          src={`https://source.unsplash.com/random/800x600`}
          alt="random image"
          withPlaceholder
          height={200}
          width={"max"}
          className="w-full"
        />
        <div className="mt-16">
          <h3 className="text-xl font-bold">新着記事</h3>
          <div className="mt-8 flex flex-row gap-12">
            <div className="basis-3/4 grid grid-cols-2 gap-6">
              {result.contents.map((article) => (
                <div key={article.id}>
                  <ArticleCard article={article} />
                </div>
              ))}
              <div className="mt-16 col-span-2 mx-auto">
                <Pagination
                  value={result.offset / 6 + 1}
                  onChange={(value) => {
                    console.log(value);
                    // window.location.href = "/blogs/page/" + value;
                  }}
                  total={result.totalCount / 6 + 1}
                />
              </div>
            </div>

            <aside className="basis-1/4">
              <div>
                <h5 className="text-base mt-0">検索</h5>
                <TextInput placeholder="Search..." />
              </div>
              <div className="mt-16">
                <h5 className="text-base">カテゴリ</h5>
                <ul>
                  <li>チュートリアル</li>
                  <li>日記</li>
                  <li>更新情報</li>
                </ul>
              </div>
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
