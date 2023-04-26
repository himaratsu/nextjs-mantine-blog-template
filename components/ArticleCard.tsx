import { Article } from "@/entity/Article";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

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
      className="hover:shadow-xl group"
    >
      <Card.Section>
        <Image src={article.eyecatch.url} height={144} alt="Norway" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <div className="font-bold group-hover:underline">{article.title}</div>
      </Group>

      <div className="text-xs line-clamp-2">{tagRemovedContent}</div>
    </Card>
  );
}
