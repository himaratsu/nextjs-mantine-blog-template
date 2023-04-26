import { ArticleCard } from "@/components/ArticleCard";
import { LayoutHeader } from "@/components/Header";
import Layout from "@/components/Layout";
import { SideBar } from "@/components/SideBar";
import { Article } from "@/entity/Article";
import { Category } from "@/entity/Category";
import { microcms } from "@/libs/microcms";
import { Group, Image, Loader, Pagination, TextInput } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type SearchProps = {
  categories: Category[];
};

export default function Search({ categories }: SearchProps) {
  const router = useRouter();
  const keyword = router.query.keyword as string;

  const [articles, setArticles] = useState<Article[] | undefined>(undefined);

  useEffect(() => {
    console.log(keyword);

    if (keyword) {
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
    <Layout keyword={keyword} categories={categories}>
      <div className="col-span-2">
        <h3 className="text-xl font-bold">検索結果</h3>
        <div className="mt-2 text-sm text-gray-500">
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

export const getStaticProps = async () => {
  const categories = await microcms.get({
    endpoint: "categories",
  });

  return {
    props: {
      categories: categories.contents,
    },
  };
};
