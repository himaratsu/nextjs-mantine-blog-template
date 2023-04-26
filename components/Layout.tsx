import { Header } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { Image } from "@mantine/core";
import { ReactNode } from "react";

type LayoutProps = {
  keyword?: string;
  children: ReactNode;
};

export default function Layout({ keyword, children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="container mx-auto">
        <Image
          src={`https://images.unsplash.com/photo-1682319298536-33ac5b48d772?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MjQwNzg1Nw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800`}
          alt="random image"
          height={240}
          className="w-full mt-2"
        />
        <div className="mt-16">
          <div className="flex flex-row gap-12">
            <div className="basis-3/4 grid grid-cols-2 gap-6">{children}</div>

            <aside className="mt-16 basis-1/4">
              <SideBar keyword={keyword} />
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
