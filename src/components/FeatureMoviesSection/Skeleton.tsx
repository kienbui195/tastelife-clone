'use client';

import * as React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function FeatureSkeleton() {
  return (
    <Skeleton className='rounded-3xl w-full sm:h-[90%] h-[500px]'></Skeleton>

  );
}