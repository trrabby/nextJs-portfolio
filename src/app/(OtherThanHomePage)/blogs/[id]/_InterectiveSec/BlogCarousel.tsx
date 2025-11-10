"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BlogCarousel = ({ thumbnails }: { thumbnails: string[] }) => {
  if (!thumbnails?.length) return null;

  return (
    <div className="rounded-2xl overflow-hidden">
      <Carousel
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={3500}
        className="rounded-lg"
      >
        {thumbnails.map((img, i) => (
          <div key={i} className="relative w-full h-[400px]">
            <Image
              src={img}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BlogCarousel;
