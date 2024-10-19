'use client'

import { createQuery } from '@/lib/utils';
import axios from 'axios';
import { Boxes } from 'lucide-react';
import * as React from 'react'
import ImageCustom from '../Image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface TopPickSectionProps {
  id:         number;
  attributes: {
    name:                     string;
    slug:                     string;
    synopsis:                 string;
    poster:                   {
      data: {
        id: number;
        attributes: {
          url: string;
        }
      }[]
    };
    categories: {data: {
      id: number;
      attributes: {
        name: string;
      }
    }[]} 
  }; 
}

export default function TopPickSection () {
  const [data, setData] = React.useState<TopPickSectionProps[]>([])
  const router = useRouter()

  function handleGetData () {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sd-movies?${createQuery({
      sort: ['release_date:desc'],
      populate: {
        poster: {
          fields: ['url']
        },
        categories: {
          fields: ['name']
        }
      },
      filters: {
        editor_picked: true
      },
      pagination: {
        page: 1,
        pageSize: 10
      },
      fields: ['name', 'synopsis', 'slug']
    })}`).then(res => {
      const rawData = res.data.data.reduce((acc: TopPickSectionProps[], item: any) => {
        const {id, attributes} = item
        acc.push({
          id,
          attributes
        })
        return acc
      } ,[])
      setData(rawData)
    }).catch(err => err)
  }

  React.useEffect(() => {
    handleGetData()
  }, [])

  return (
    <section>
      <div className='space-x-1 flex items-center font-bold'>
        <div className='text-lg'>Top Pick</div>
        <Boxes/>
      </div>
      <div className='mt-1 space-y-3'>
        {data.map((item, idx) => (
          <div className='flex w-full' key={idx}>
            <ImageCustom src={item.attributes.poster.data[0]?.attributes.url ?? ''} className='object-cover rounded-lg w-[128px] h-[192px] cursor-pointer' onClick={() => router.push(`/play-movie/${item.attributes.slug}`)}/>
            <div className='p-2'>
              <div className='line-clamp-1 text-ellipsis text-lg'>{item.attributes.name}</div>
              <div className='text-gray-400'>{item.attributes.categories.data[0]?.attributes.name}</div>
              <div className='mt-2 line-clamp-3 text-ellipsis text-gray-400'>{
                item.attributes.synopsis}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
