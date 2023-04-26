import { Article } from "@/entity/Article";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import Link from "next/link";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  const tagRemovedContent = article.content.replace(
    /<("[^"]*"|'[^']*'|[^'">])*>/g,
    ""
  );

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="sm"
      withBorder
      className="hover:shadow-xl hover:bg-gray-100 group"
    >
      <Card.Section>
        <Image src={article.eyecatch.url} height={172} alt={article.title} />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <div className="font-bold">{article.title}</div>
      </Group>

      <div className="text-xs line-clamp-2 leading-relaxed text-gray-600">
        {tagRemovedContent}
      </div>

      <Group position="apart" className="mt-4 text-xs">
        <p className="mt-2 text-gray-600 rounded ">#{article.category.name}</p>
      </Group>
    </Card>
  );
}
