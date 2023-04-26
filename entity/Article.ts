import { MicroCMSImage } from "microcms-js-sdk";

export type Article = {
  id: string;
  title: string;
  content: string;
  category: {
    id: string;
    name: string;
  };
  eyecatch: MicroCMSImage;
  publishedAt: string;
  updatedAt: string;
};
