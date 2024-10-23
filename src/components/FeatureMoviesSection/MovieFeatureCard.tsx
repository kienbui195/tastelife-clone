'use client';
import { cn } from '@/lib/utils';
import * as React from 'react';
import ImageCustom from '../Image';
import { Button } from '../ui/button';
import { Play, Plus } from 'lucide-react';
import Link from 'next/link';

export interface MovieFeatureCardProps {
  thumbnail: string; slug: string;
}

const MovieFeatureCard = ({ thumbnail, slug }: MovieFeatureCardProps) => {
  return (
    <div className={cn([
      `rounded-3xl w-full h-[500px] relative overflow-hidden`
    ])}>
      <ImageCustom src={thumbnail} className='object-cover w-full h-full rounded-3xl bg-black'/>
      <div className='flex items-center px-2 pb-2 absolute justify-between left-2 right-2 bottom-2'>
        <Link href={`/play-movie/${slug}`}><Button className='bg-white hover:bg-gray-100 text-black rounded-full h-12'>
          <div className='flex space-x-2 items-center'>
            <Play className='fill-black'/>
            <span>Play</span>
          </div>
        </Button></Link>
        <Button className='bg-white hover:bg-gray-100 text-black rounded-full size-12' size={'icon'}>
          <Plus/>
        </Button>
      </div>
    </div>
  );
};

export default MovieFeatureCard;