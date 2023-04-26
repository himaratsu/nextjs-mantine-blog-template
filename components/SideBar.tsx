import { Button, Flex, Group, TextInput } from "@mantine/core";

type SideBarProps = {
  keyword?: string | undefined;
};

export function SideBar({ keyword }: SideBarProps) {
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
        <ul className="list-disc">
          <li>チュートリアル</li>
          <li>日記</li>
          <li>更新情報</li>
        </ul>
      </div>
    </>
  );
}
