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


export interface ContinueWatchingSectionProps {
  movie_info: {
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
  };
  order: number;
  total_episodes: number;
}



export default function ContinueWatchingSection() {
  const [data, setData] = React.useState<ContinueWatchingSectionProps[]>([]);
  const { ref, inView } = useInView();
  const [loading, setLoading] = React.useState(true);

  const handleGetData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sd-watchings/continue-watching`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      }
    }).then(res => {
      const dataSend = res.data.data.reduce((acc: ContinueWatchingSectionProps[], item: any) => {
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
        <div className='font-bold text-white text-lg'>Continue Watching</div>
      </div>

      <Carousel className=''>
        <CarouselContent className='h-full'>
          {!loading ? data.map((item, idx) => (
            <CarouselItem key={idx} className='w-[166px] basis-2/5 sm:basis-1/4'>
              <div className='flex flex-col space-y-2'>
                <Link href={`/play-movie/${item.movie_info.attributes.slug}`} className='relative'>
                  <ImageCustom src={item.movie_info.attributes.poster.data[0]?.attributes.url ?? ''} className='w-[166px] object-cover rounded-xl h-[93px]' />
                  <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
                    <div className='bg-black size-10 flex justify-center items-center rounded-full'>
                      <Play className='size-6 fill-white' />
                    </div>
                  </div>
                </Link>
                <div className='space-y-1'>
                  <div className='text-white line-clamp-1 text-ellipsis'>{item.movie_info.attributes.name}</div>
                  <div className='flex items-center space-x-1'>
                    <div className='text-gray-400 text-sm'>{`EP:${item.order}/EP:${item.total_episodes}`}</div>
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