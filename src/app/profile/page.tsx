"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Copy,
  Database,
  Gift,
  Info,
  Languages,
  Settings,
  Sparkle,
  TicketPercent,
  Trash,
  User,
  UserRoundPlus,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";


export default function Profile() {
  const router = useRouter();
  const [openPopup, setOpenPopup] = React.useState({
    open: false,
    body: <></>,
    title: ''
  });

  const onNavigation = (slug: string) => {
    router.push(`/profile/${slug}`);
  };

  return (
    <section className="flex flex-col items-center space-y-6">
      <div className="space-y-3 flex flex-col items-center">
        <Avatar className="size-[100px] mt-[18px]">
          <User className="size-[100px] text-gray-400" />
        </Avatar>
        <div className="pt-1 font-semibold text-xl">Guest</div>
        <div className="text-gray-400 text-sm flex items-center space-x-2">
          <div>{`ID: 7347fh374fh374f `}</div>
          <Copy className="size-4" />{" "}
        </div>
      </div>
      <Button className="rounded-full bg-orange-400 hover:bg-orange-300 py-4 px-6 text-2xl text-black h-fit">
        Sign in & Receive 50 bonuses
      </Button>
      <div className="flex flex-col w-full px-4 space-y-2 pb-6">
        <div className="flex flex-col  p-4 rounded-2xl bg-gray-800 space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center space-x-2">
              <div>Wallet</div>
              <ChevronRight onClick={() => onNavigation('/my-wallet')} />
            </div>
            <Button className="bg-red-500 rounded-full h-10 text-xs text-white hover:bg-pink-300">Top Up</Button>
          </div>
          <div className="space-x-4 flex items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-gray-700 rounded-xl p-2 size-10">
                <Database />
              </div>
              <div>0</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-700 rounded-xl p-2 size-10">
                <Sparkle />
              </div>
              <div>0</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 rounded-2xl bg-gray-800 space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gift />
              <div>Earn rewards</div>
            </div>
            <ChevronRight className="text-gray-400" />
          </div>
        </div>
        <div className="flex flex-col p-4 rounded-2xl bg-gray-800 space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <Wallet />
              <div>My list</div>
            </div>
            <ChevronRight className="text-gray-400" onClick={() => onNavigation('/my-list')}/>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <TicketPercent />
              <div>My coupons</div>
            </div>
            <ChevronRight className="text-gray-400" onClick={() => onNavigation('/my-coupons')} />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <UserRoundPlus />
              <div>Referrals</div>
            </div>
            <ChevronRight className="text-gray-400" onClick={() => onNavigation('/referrals')} />
          </div>
        </div>
        <div className="flex flex-col p-4 rounded-2xl bg-gray-800 space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings />
              <div>Settings</div>
            </div>
            <ChevronRight className="text-gray-400" onClick={() => {
              setOpenPopup(prev => ({
                ...prev,
                open: true, title: 'Settings', body: <div className="flex flex-col p-4 rounded-2xl text-black space-y-4">
                  <div className="flex flex-row items-center justify-between">
                    <div>Terms of Service</div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div>Privacy Policy</div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div>Delete account</div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div>Clear cache</div>
                    <Trash className="text-gray-400" />
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <div>Rate us</div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                </div>
              }));
            }} />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <Languages />
              <div>Language</div>
            </div>
            <ChevronRight className="text-gray-400" onClick={() => {
              setOpenPopup(prev => ({
                ...prev,
                open: true, title: 'Choose Language', body: <div className="flex flex-col w-full p-4 space-y-4 text-black">
                  <label className="flex flex-row space-x-2 items-center">
                    <input defaultChecked type="radio" />
                    <div>English</div>
                  </label>
                </div>
              }));
            }} />
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <Info />
              <div>Supports</div>
            </div>
            <ChevronRight className="text-gray-400" onClick={() => {
              if (typeof window !== 'object') return;
              window.open('mailto:developer.support@.gmail.com', '_blank');
            }} />
          </div>
        </div>
        <div className="flex flex-col p-4 rounded-2xl bg-gray-800 space-y-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChevronRight className="rotate-180" />
              <div>Sign Out</div>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        open={openPopup.open}
        onClose={() => setOpenPopup(prev => ({ ...prev, open: false }))}
        onOpenChange={(open) => setOpenPopup(prev => ({ ...prev, open }))}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-black font-semibold">{openPopup.title}</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            {openPopup.body}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
