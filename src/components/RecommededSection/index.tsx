'use client'

import * as React from 'react'
import { createQuery, formatNumber } from '@/lib/utils';
import axios from 'axios';
import { Flame, Play } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious } from '../ui/carousel';
import ImageCustom from '../Image';
import Link from 'next/link';
import moment from 'moment';


export interface RecommendedSectionProps {
  id:         number;
    attributes: {
      name:              string;
      slug:              string;
      release_date: Date;
      poster:            {
        data: {
          id: number;
          attributes: {
            url: string;
          }
        }[]
      };
      categories: {
        data: {
          id: number;
          attributes: {
            name: string;
          }
        }[]
      }
    }
}



export default function RecommendedSection () {
  const [data, setData] = React.useState<RecommendedSectionProps[]>([])

  const handleGetData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sd-movies?${createQuery({
      filters: {
        recommended: true
      },
      populate: {
        poster: {
          fields: ['url']
        },
        categories: {
          fields: ['name']
        }
      }
    })}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      }
    }).then(res => {
      const dataSend = res.data.data.reduce((acc: RecommendedSectionProps[], item: any) => {
        acc.push(item)
        return acc
      }, [])

      setData(dataSend);
    }).catch(err => {
      console.log(err.message);
    }); 
  }

  React.useEffect(() => {
    handleGetData()
  }, [])

  return (
    <section className='flex flex-col space-y-2'>
      <div className='flex items-center space-x-1'>
        <div className='font-bold text-white text-lg'>Recommended</div>
      </div>

      <Carousel className=''>
          <CarouselContent className='h-full'>
            {data.map((item, idx) => (
              <CarouselItem key={idx} className='w-[166px] basis-2/5 sm:basis-1/4'>
                 <div className='flex flex-col space-y-2'>
                  <Link href={`/play-movie/${item.attributes.slug}`} className='relative'>
                    <ImageCustom src={item.attributes.poster.data[0]?.attributes.url ?? ''} className='w-[166px] object-cover rounded-xl h-[93px]'/>
                    <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
                      <div className='bg-black size-10 flex justify-center items-center rounded-full'>
                        <Play className='size-6 fill-white'/>
                      </div>
                    </div>
                  </Link>
                  <div className='space-y-1'>
                    <div className='text-white line-clamp-1 text-ellipsis'>{item.attributes.name}</div>
                    <div className='flex items-center space-x-1'>
                      <div className='text-gray-400 text-sm'>{item.attributes.categories.data[0]?.attributes.name ?? ''}</div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
    </section>
  )
}