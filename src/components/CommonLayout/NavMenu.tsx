'use client'

import * as React from 'react'
import { Button } from '../ui/button';
import { Film, Gift, Home, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import NavItem from './NavItem';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavMenu () {
  const pathname = usePathname()

  return (
    <React.Fragment>
      <footer className='fixed bottom-0 w-full bg-red-950 sm-container'>
      <div className='flex items-center justify-around py-4'>
      <Link href={'/'}>
        <NavItem icon={<Home/>} label='Home' isChoose={pathname === '/'}/>
      </Link>
      <Link href={'/for-you'}>
        <NavItem icon={<Film/>} label='For you' isChoose={pathname === '/for-you'}/> 
      </Link>
      <Link href={'/rewards'}>
        <NavItem icon={<Gift/>} label='Rewards' isChoose={pathname === '/rewards'} />
      </Link>
      <Link href={'/profile'}>
        <NavItem icon={<User/>} label='Profile' isChoose={pathname === '/profile'}/>
      </Link>
      </div>
    </footer>
    <div className='h-[80px] w-full'></div>
    </React.Fragment>
  )
}