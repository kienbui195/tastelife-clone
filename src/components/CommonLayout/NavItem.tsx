import * as React from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export default function NavItem ({isChoose = false, icon, label}: {isChoose?: boolean; icon?: React.ReactNode; label: string;}) {
  return (
    <Button 
      className={cn([
        'bg-transparent hover:bg-transparent font-bold',
         isChoose ? 'text-white fill-white shadow-xl shadow-white' : 'text-gray-500 fill-gray-500'
      ])} 
      size={'icon'} >
        <div className='flex flex-col space-y-2 items-center justify-center p-2'>
          {icon}
          <div className='text-lg'>{label}</div>
        </div>
    </Button>
  )
}