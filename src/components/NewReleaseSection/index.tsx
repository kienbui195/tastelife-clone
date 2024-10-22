'use client';

import * as React from 'react';
import { createQuery, formatNumber } from '@/lib/utils';
import axios from 'axios';
import { Flame, Play } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious } from '../ui/carousel';
import ImageCustom from '../Image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import TrendingSectionSkeleton from '../TrendingSection/Skeleton';


export interface NewReleaseSectionProps {
  id: number;
  attributes: {
    name: string;
    slug: string;
    total_views_count: number;
    poster: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      }[];
    };
  };
}



export default function NewReleaseSection() {
  const [data, setData] = React.useState<NewReleaseSectionProps[]>([]);
  const { ref, inView } = useInView();
  const [loading, setLoading] = React.useState(true);

  const handleGetData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sd-movies/trending-movies?filters[is_new]=true&pagination[page]=1&pagination[pageSize]=10&fields[0]=name&fields[1]=slug&fields[2]=total_views_count&populate[poster][fields][0]=url`).then(res => {
      const dataSend = res.data.data.reduce((acc: NewReleaseSectionProps[], item: any) => {
        acc.push(item);
        return acc;
      }, []);

      setData(dataSend);
    }).catch(err => {
      console.log(err.message);
    }).finally(() => setLoading(false));
  };

  React.useEffect(() => {
    inView && data.length < 1 && handleGetData();
  }, [inView]);

  return (
    <section className='flex flex-col space-y-2' ref={ref}>
      <div className='flex items-center space-x-1'>
        <div className='font-bold text-white text-lg'>New Release</div>
      </div>

      <Carousel className=''>
        <CarouselContent className='h-full'>
          {!loading ? data.map((item, idx) => (
            <CarouselItem key={idx} className='w-[166px] basis-2/5 sm:basis-1/4'>
              <div className='flex flex-col space-y-2'>
                <Link href={`/play-movie/${item.attributes.slug}`}>
                  <ImageCustom src={item.attributes.poster.data[0]?.attributes.url ?? ''} className='w-[166px] object-cover rounded-xl h-[93px]' />
                </Link>
                <div className='space-y-1'>
                  <div className='text-white line-clamp-1 text-ellipsis'>{item.attributes.name}</div>
                  <div className='flex items-center space-x-1'>
                    <Play className='fill-gray-400 size-3' />
                    <div className='text-gray-400 text-sm'>{formatNumber(item.attributes.total_views_count)}</div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          )) : Array.from({ length: 5 }).map((_, idx) => (
            <CarouselItem key={idx} className='w-[166px] basis-2/5 sm:basis-1/4'>
              <TrendingSectionSkeleton />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}