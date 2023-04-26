import { LayoutHeader } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { Category } from "@/entity/Category";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";
import { CarouselBanner } from "./CarouselBanner";

type LayoutProps = {
  banners: Banner[];
  keyword?: string;
  categories: Category[];
  children: ReactNode;
};

export default function Layout({
  banners,
  keyword,
  categories,
  children,
}: LayoutProps) {
  return (
    <>
      <LayoutHeader />
      <main className="container mx-auto">
        <CarouselBanner banners={banners} />

        <div className="mt-16">
          <div className="flex flex-row gap-12">
            <div className="basis-3/4 grid grid-cols-2 gap-6">{children}</div>

            <aside className="basis-1/4">
              <SideBar keyword={keyword} categories={categories} />
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
