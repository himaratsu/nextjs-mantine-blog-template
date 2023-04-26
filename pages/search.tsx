import { ArticleCard } from "@/components/ArticleCard";
import { Header } from "@/components/Header";
import Layout from "@/components/Layout";
import { SideBar } from "@/components/SideBar";
import { Article } from "@/entity/Article";
import { Group, Image, Loader, Pagination, TextInput } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search() {
  const router = useRouter();
  const keyword = router.query.keyword as string;

  const [articles, setArticles] = useState<Article[] | undefined>(undefined);

  useEffect(() => {
    console.log(keyword);

    if (keyword) {
      console.log("search...");

      const fetchSearch = async () => {
        const response = await fetch(`/api/search?keyword=${keyword}`);
        const json = await response.json();

        console.log(json.articles);

        setArticles(json.articles);
      };
      fetchSearch();
    }
  }, [keyword]);

  return (
    <Layout keyword={keyword}>
      <div className="col-span-2">
        <h3 className="text-xl font-bold">検索結果</h3>
        <div className="mt-1 text-sm text-gray-500">
          {articles != null
            ? `${articles.length}件の記事がヒットしました`
            : "Loading..."}
        </div>
      </div>

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
    </Layout>
  );
}
