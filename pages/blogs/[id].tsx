import { Article } from "@/entity/Article";
import { microcms } from "@/libs/microcms";
import { Image, Pagination, TextInput } from "@mantine/core";
import Link from "next/link";
// import styles from "@/styles/Article.module.scss";
import styles from "@/styles/hoge.module.css";
import { SideBar } from "@/components/SideBar";

type BlogDetailProps = {
  article: Article;
};

export default function BlogDetail({ article }: BlogDetailProps) {
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
      <main className="container mx-auto">
        <div className="mt-8">
          <div className="text-sm">
            記事一覧 {">"} {article.title}
          </div>
          <div className="mt-8 flex flex-row gap-12">
            <div className="basis-3/4">
              <Image src={article.eyecatch.url} />
              <h3 className="mt-8 font-bold text-2xl">{article.title}</h3>
              <div className="mt-12">
                <div
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  className={styles.content}
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

// getStaticPathsを実装
// microCMSからidだけ取得し、mapしてpathsを作る
export const getStaticPaths = async () => {
  const data = await microcms.get({
    endpoint: "blogs",
    queries: { fields: "id" },
  });

  const paths = data.contents.map((content: any) => `/blogs/${content.id}`);

  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const data = await microcms.getListDetail({
    endpoint: "blogs",
    contentId: context.params.id,
  });

  return {
    props: {
      article: data,
    },
  };
};