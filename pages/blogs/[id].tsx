import { Article } from "@/entity/Article";
import { microcms } from "@/libs/microcms";
import { Image } from "@mantine/core";
import styles from "@/styles/editor.module.css";
import { LayoutHeader } from "@/components/Header";
import { Footer } from "@/components/Footer";

type BlogDetailProps = {
  article: Article;
};

export default function BlogDetail({ article }: BlogDetailProps) {
  if (article == null) {
    return <div>loading...</div>;
  }

  return (
    <>
      <LayoutHeader />
      <main className="container mx-auto">
        <div className="mt-8">
          <Image src={article.eyecatch.url + "?h=480"} height={480} />
          <h3 className="mt-8 font-bold text-3xl">{article.title}</h3>
          {/* <div className="mt-4 text-sm font-semibold text-gray-400">
              記事一覧 {">"} {article.title}
            </div> */}
          <div className="mt-4 text-indigo-600">#{article.category.name}</div>
          <div className="mt-16">
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              className={styles.content}
            />
          </div>
        </div>
      </main>
      <Footer />
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

  return { paths, fallback: true };
};

export const getStaticProps = async (context: any) => {
  const { params, previewData } = context;

  console.log(params);
  console.log(previewData);

  if (!params?.id) {
    throw new Error("Error: ID not found");
  }

  type Draft = {
    draftKey: string;
  };

  const isDraft = (arg: any): arg is Draft => {
    if (!arg?.draftKey) {
      return false;
    }
    return typeof arg.draftKey === "string";
  };

  const contentId = String(params.id);
  const draftKey = isDraft(previewData)
    ? { draftKey: previewData.draftKey }
    : {};

  const data = await microcms.getListDetail({
    endpoint: "blogs",
    contentId: contentId,
    // queries: draftKey,
  });

  return {
    props: {
      article: data,
    },
  };
};
