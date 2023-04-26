import { MicroCMSImage } from "microcms-js-sdk";
import { Category } from "./Category";

export type Article = {
  id: string;
  title: string;
  content: string;
  category: Category;
  eyecatch: MicroCMSImage;
  publishedAt: string;
  updatedAt: string;
};
