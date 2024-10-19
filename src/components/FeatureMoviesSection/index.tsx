"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import MovieFeatureCard, { MovieFeatureCardProps } from "./MovieFeatureCard";
import axios from "axios";
import { createQuery } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

const FeatureSection = () => {
  const [data, setData] = React.useState<MovieFeatureCardProps[]>([]);

  const handleGetData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/sd-movies/featured-content?${createQuery({
          locale: "en",
          pagination: {
            page: 1,
            pageSize: 20,
          },
          populate: {
            poster: {
              fields: ["url"],
            },
          },
          fields: ["name", "slug"],
        })}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        }
      )
      .then(res => {
        const pageData = res.data.data.reduce((acc: MovieFeatureCardProps[], item: any) => {
          acc.push({
            thumbnail: item.attributes.poster.data[0]?.attributes.url ?? "",
            slug: item.attributes.slug,
          });
          return acc;
        }, []);

        setData(pageData);
      })
      .catch(err => err);
  };

  React.useEffect(() => {
    handleGetData();
  }, []);

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((item, idx) => (
          <CarouselItem key={idx} className="">
            <MovieFeatureCard thumbnail={item.thumbnail} slug={item.slug} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default FeatureSection;
