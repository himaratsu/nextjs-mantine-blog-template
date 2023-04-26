// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { microcms } from "@/libs/microcms";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { keyword } = req.query;
  console.log(keyword);

  if (keyword === undefined) {
    res.status(400).json({ error: "keyword is required" });
    return;
  }

  console.log(keyword);

  const result = await microcms.getList({
    endpoint: "blogs",
    queries: { q: keyword as string },
  });
  console.log(result);

  res.status(200).json({ articles: result.contents });
}
