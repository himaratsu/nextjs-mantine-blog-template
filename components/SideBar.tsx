import { Category } from "@/entity/Category";
import { Button, Flex, Group, TextInput } from "@mantine/core";
import Link from "next/link";

type SideBarProps = {
  keyword?: string | undefined;
  categories: Category[];
};

export function SideBar({ keyword, categories }: SideBarProps) {
  return (
    <>
      <div>
        <h5 className="font-bold mb-2">検索</h5>

        <TextInput
          placeholder="Search..."
          defaultValue={keyword}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              const keyword = e.currentTarget.value;
              window.location.href = `/search?keyword=${keyword}`;
            }
          }}
        />
      </div>
      <div className="mt-12">
        <h5 className="font-bold mb-2">カテゴリ</h5>
        <ul className="list-disc ml-4 leading-relaxed">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                className="hover:underline"
                href={"/categories/" + category.id}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
