import { LayoutHeader } from "@/components/Header";
import { SideBar } from "@/components/SideBar";
import { Category } from "@/entity/Category";
import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Link from "next/link";
import { ReactNode } from "react";
import { CarouselBanner } from "./CarouselBanner";
import { Footer } from "./Footer";

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
      <CarouselBanner banners={banners} />
      <main className="container mx-auto">
        <div className="mt-16">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="sm:basis-3/4 grid grid-cols-2 gap-2 sm:gap-6">
              {children}
            </div>

            <aside className="basis-1/4 mt-20">
              <SideBar keyword={keyword} categories={categories} />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
