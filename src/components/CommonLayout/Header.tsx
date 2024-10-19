'use client';
import * as React from 'react';
import Clock from '../Clock';
import { BatteryFull, Gift, Search, Wifi, WifiOff } from 'lucide-react';
import { useCheckConnection } from '@/hooks/useCheckConnectionInternet';

const Header = () => {
  const isConnect = useCheckConnection();

  return (
    <React.Fragment>
      <section className='fixed top-0 z-40 px-4 bg-red-950 w-full sm-container text-white py-1'>
      <div className='flex items-center justify-between'>
        <Clock />
        <div className='flex items-center flex-nowrap space-x-2'>
          {isConnect ? <Wifi /> : <WifiOff />}
          <BatteryFull />
        </div>
      </div>
      <div className='flex items-center justify-between py-2'>
        <span className='text-2xl font-bold'>TasteLife</span>
        <div className='flex items-center space-x-6'>
          <Search />
          <Gift />
        </div>
      </div>
    </section>
    <section className='h-[80px]'></section>
    </React.Fragment>
  );
};

export default Header;