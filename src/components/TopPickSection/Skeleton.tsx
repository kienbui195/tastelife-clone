import * as React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function TopPickSectionSkeleton() {
  return (
    <div className='flex w-full'>
      <Skeleton className='rounded-lg w-[128px] h-[192px]' />
      <div className='p-2'>
        <Skeleton className='w-[128px] h-4'></Skeleton>
        <Skeleton className='h-3 w-[100px]' ></Skeleton>
        <Skeleton className='mt-2 h-9 w-[150px]'></Skeleton>
      </div>
    </div>
  );
}