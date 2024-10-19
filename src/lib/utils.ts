import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'qs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl (url?: string) {
  return url ? (url.includes('http://') || url.includes('https://')) ? url : `${process.env.NEXT_PUBLIC_BE_URL}${url}` : ''
}

export function createQuery (query: any) {
  return qs.stringify(query, {encodeValuesOnly: true})
}

export function formatNumber(num: number) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B'; // Tỷ (Billion)
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'; // Triệu (Million)
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'; // Ngàn (Thousand)
  } else {
    return num.toString(); // Số nhỏ hơn 1000
  }
}
