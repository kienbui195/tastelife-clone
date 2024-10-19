import { VariantProps } from 'class-variance-authority';
import * as React from 'react'
import Image from 'next/image'
import { cn, getImageUrl } from '@/lib/utils';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, VariantProps<any> {
  
}

const ImageCustom = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, ...props }, ref) => {
    return (
      <Image
        className={cn([className])}
        ref={ref}
        alt=""
        src={getImageUrl(src ?? '')}
        {...props}
        width={0}
        height={0}
        sizes='100vw'
        />
    )
  }
)
ImageCustom.displayName = 'ImageCustom'

export default ImageCustom