import * as React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function TrendingSectionSkeleton() {
  return (
    <div className='flex flex-col space-y-2'>
      <Skeleton className='w-[160px] object-cover rounded-xl h-[93px]' />
      <div className='space-y-1'>
        <Skeleton className='text-white w-[80%] h-3'></Skeleton>
      </div>
    </div>
  );
}