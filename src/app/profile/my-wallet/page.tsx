'use client';

import * as React from 'react';
import { useHeaderContext } from "@/context/HeaderContext";
import { ChevronRight, Database, Info, KeyRound, LockOpen, Logs, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function MyWallet() {
  const { updateHeader } = useHeaderContext();

  React.useEffect(() => {
    updateHeader("My Wallet", "/profile");

  }, []);

  return (
    <section className='mt-8 flex flex-col px-4 space-y-8 min-h-max items-center'>
      <div className='grid grid-cols-2 w-full gap-6'>
        <div className='rounded-2xl bg-gray-800 p-4'>
          <Database />
          <div className='mt-2 font-bold'>Coins</div>
          <div>0</div>
        </div>
        <div className='rounded-2xl bg-gray-800 p-4'>
          <div className='flex flex-row justify-between items-start'>
            <Sparkle />
            <Info className='size-4' />
          </div>
          <div className='mt-2 font-bold'>Bonus</div>
          <div>0</div>
        </div>
      </div>
      <Button className='bg-red-500 hover:bg-red-400 text-white rounded-full w-full h-14 leading-6 text-lg'>Top-up</Button>
      <div className="flex flex-col p-4 rounded-2xl bg-gray-800 w-full space-y-4">
        <div className="flex flex-row h-14 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logs />
            <div>Transaction history</div>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
        <div className="flex flex-row h-14 items-center justify-between">
          <div className="flex items-center space-x-3">
            <LockOpen />
            <div>Episodes unlocked</div>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
        <div className="flex flex-row h-14 items-center justify-between">
          <div className="flex items-center space-x-3">
            <KeyRound />
            <div>Episodes on auto-unlock</div>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
        <div className="flex flex-row h-14 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkle />
            <div>Bonus history</div>
          </div>
          <ChevronRight className="text-gray-400" />
        </div>
      </div>
    </section>
  );
}