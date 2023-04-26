import { Carousel } from "@mantine/carousel";
import { Image } from "@mantine/core";
import Link from "next/link";

type CarouselBannerProps = {
  banners: Banner[];
};

export function CarouselBanner({ banners }: CarouselBannerProps) {
  return (
    <Carousel mx="auto" withIndicators height={240} loop>
      {banners.map((banner) => (
        <Carousel.Slide key={banner.id}>
          <Link href={banner.link} target="_blank">
            <Image
              src={banner.imageUrl}
              alt={banner.title}
              height={240}
              className="w-full"
            />
          </Link>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
