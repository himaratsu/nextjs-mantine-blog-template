import { ArticleCard } from "@/components/ArticleCard";
import { Article } from "@/entity/Article";
import { microcms } from "@/libs/microcms";
import { Group, Image, Loader, Pagination, TextInput } from "@mantine/core";
import { MicroCMSListResponse } from "microcms-js-sdk";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const keyword = router.query.keyword;

  const [articles, setArticles] = useState<Article[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(keyword);

    if (keyword) {
      console.log("search...");

      const fetchSearch = async () => {
        setLoading(true);
        const response = await fetch(`/api/search?keyword=${keyword}`);
        const json = await response.json();
        console.log(json);

        console.log(json.articles);

        setLoading(false);
        setArticles(json.articles);
      };
      fetchSearch();
    }
  }, [keyword]);

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
          <h3 className="text-xl font-bold">検索結果</h3>
          <div className="mt-1 text-sm text-gray-500">
            {articles != null && `${articles.length}件の記事`}
          </div>

          <div className="mt-8 flex flex-row gap-12">
            <div className="basis-3/4 grid grid-cols-2 gap-6">
              {loading && (
                <div className="mt-16 col-span-2 mx-auto">
                  <Loader />
                </div>
              )}
              {articles && (
                <>
                  {articles.map((article) => (
                    <div key={article.id}>
                      <Link href={"/blogs/" + article.id}>
                        <ArticleCard article={article} />
                      </Link>
                    </div>
                  ))}
                </>
              )}
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
