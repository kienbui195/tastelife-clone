"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import MovieFeatureCard, { MovieFeatureCardProps } from "./MovieFeatureCard";
import axios from "axios";
import { createQuery } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import useSWR from "swr";
import { useInView } from 'react-intersection-observer';
import { Skeleton } from "../ui/skeleton";
import FeatureSkeleton from "./Skeleton";




const FeatureSection = () => {
  const [data, setData] = React.useState<MovieFeatureCardProps[]>([]);
  const { ref, inView } = useInView();
  const [loading, setLoading] = React.useState(true);

  const handleGetPageData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sd-movies/featured-content?${createQuery({
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
    })}`, { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}` } })
      .then(res => {
        const rawData = res.data.data.reduce((acc: MovieFeatureCardProps[], item: any) => {
          acc.push({
            thumbnail: item.attributes.poster.data[0]?.attributes.url ?? "",
            slug: item.attributes.slug,
          });
          return acc;
        }, []);
        setData(rawData);
      })
      .catch(err => err)
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    inView && data.length < 1 && handleGetPageData();
  }, [inView]);

  return <section ref={ref}>
    {!loading ? (
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
    ) : <FeatureSkeleton />}
  </section>;
};

export default FeatureSection;
