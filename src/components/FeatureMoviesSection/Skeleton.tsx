'use client'

import * as React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function FeatureSkeleton () {
  return (
    <Skeleton className='rounded-3xl sm:max-w-[640px] w-full max-w-[398px] sm:h-[90%] h-[500px] m-4'></Skeleton>
  )
}