'use client';

import { createQuery } from '@/lib/utils';
import axios from 'axios';
import { Flame } from 'lucide-react';
import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious } from '../ui/carousel';
import ImageCustom from '../Image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import TrendingSectionSkeleton from './Skeleton';

export interface TrendingMovieProps {
  name: string;
  thumbnail: string;
  slug: string;
}

export default function TrendingSection() {
  const [data, setData] = React.useState<TrendingMovieProps[]>([]);
  const { ref, inView } = useInView();
  const [loading, setLoading] = React.useState(true);

  const handleGetData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sd-movies/trending-movies?${createQuery({
      locale: 'en',
      pagination: {
        page: 1, pageSize: 10
      }
    })}`).then(res => {
      const dataSend = res.data.data.reduce((acc: TrendingMovieProps[], item: any) => {
        acc.push({
          name: item.attributes.name,
          slug: item.attributes.slug,
          thumbnail: item.attributes.poster.data[0]?.attributes.url ?? ''
        });
        return acc;
      }, []);

      setData(dataSend);
    }).catch(err => {
      console.log(err.message);
    })
    .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    inView && data.length < 1 && handleGetData();
  }, [inView]);

  return (
    <section className='flex flex-col space-y-2 mt-8' ref={ref}>
      <div className='flex items-center space-x-1'>
        <div className='font-bold text-white text-lg'>Trending</div>
        <Flame />
      </div>
      <Carousel className='h-[137px]' >
        <CarouselContent className='h-full'>
          {!loading ? data.map((item, idx) => (
            <CarouselItem key={idx} className='w-[166px] basis-2/5 sm:basis-1/4'>
              <div className='flex flex-col space-y-2'>
                <Link href={`/play-movie/${item.slug}`}>
                  <ImageCustom src={item.thumbnail} className='w-[166px] object-cover rounded-xl h-[93px]' />
                </Link>
                <div className='space-y-1'>
                  <div className='text-white line-clamp-1 text-ellipsis'>{item.name}</div>
                </div>
              </div>
            </CarouselItem>
          )) : Array.from({ length: 3 }).map((_, idx) => (
            <CarouselItem key={idx} className='basis-2/5 sm:basis-1/4'>
              <TrendingSectionSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}