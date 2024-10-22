"use client";

import ImageCustom from "@/components/Image";
import { TopPickSectionProps } from "@/components/TopPickSection";
import { Button } from "@/components/ui/button";
import { useHeaderContext } from "@/context/HeaderContext";
import { createQuery } from "@/lib/utils";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

export interface MyListData {
  id: number;
  attributes: {
    movie_info: {
      attributes: {
        name: string;
        slug: string;
        categories: {
          data: {
            id: number;
            attributes: {
              name: string;
            };
          }[];
        };
        synopsis: string;
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
  };
}

export default function MyList() {
  const { updateHeader } = useHeaderContext();
  const [data, setData] = React.useState<MyListData[]>([]);
  const router = useRouter();

  function handleGetData() {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sd-m-favorites/favorites?${createQuery({
      pagination: {
        page: 1,
        pageSize: 10
      }
    })}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
      }
    }).then(res => {
      const rawData = res.data.data.reduce((acc: MyListData[], item: any) => {
        const { id, attributes } = item;
        acc.push({
          id,
          attributes
        });
        return acc;
      }, []);

      setData(rawData);

    }).catch(err => err);
  }

  function onDelete(id: number) {
    if (confirm('Are you sure? This action cannot be restored?')) {
      axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/sd-m-favorites/favorites/${id}`).then(() => {
        alert('Delete successfully!');
        handleGetData();
      }).catch(err => alert('Something wrong!'));
    }
  }

  React.useEffect(() => {
    updateHeader("My List", "/profile");
    handleGetData();
  }, []);

  return (
    <section className="mt-8 flex flex-col px-4 space-y-8 min-h-max items-center">
      {data.map((item, idx) => (
        <div className='flex w-full relative' key={idx}>
          <ImageCustom src={item.attributes.movie_info.attributes.poster.data[0]?.attributes.url ?? ''} className='object-cover rounded-lg w-[128px] h-[192px] cursor-pointer' onClick={() => router.push(`/play-movie/${item.attributes.movie_info.attributes.slug}`)} />
          <div className='p-2'>
            <div className='line-clamp-1 text-ellipsis text-lg'>{item.attributes.movie_info.attributes.name}</div>
            <div className='text-gray-400'>{item.attributes.movie_info.attributes.categories.data[0]?.attributes.name}</div>
            <div className='mt-2 line-clamp-3 text-ellipsis text-gray-400'>{
              item.attributes.movie_info.attributes.synopsis}
            </div>
          </div>
          <Button size={'icon'} className="absolute bottom-0 right-0" onClick={() => onDelete(item.id)}><Trash2 /></Button>
        </div>
      ))}
    </section>
  );
}
