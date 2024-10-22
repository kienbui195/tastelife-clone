"use client";
import * as React from "react";
import Clock from "../Clock";
import { BatteryFull, ChevronLeft, Gift, Search, Wifi, WifiOff } from "lucide-react";
import { useCheckConnection } from "@/hooks/useCheckConnectionInternet";
import { usePathname } from "next/navigation";
import { useHeaderContext } from "@/context/HeaderContext";
import Link from "next/link";

const Header = () => {
  const isConnect = useCheckConnection();
  const pathname = usePathname();
  const { label, slug, updateHeader } = useHeaderContext();

  return (
    <React.Fragment>
      <section className="fixed top-0 z-40 px-4 bg-red-950 w-full sm-container text-white py-1">
        <div className="flex items-center justify-between">
          <Clock />
          <div className="flex items-center flex-nowrap space-x-2">
            {isConnect ? <Wifi /> : <WifiOff />}
            <BatteryFull />
          </div>
        </div>
        {pathname === "/" && (
          <div className="flex items-center justify-between py-2">
            <span className="text-2xl font-bold">TasteLife</span>
            <div className="flex items-center space-x-6">
              <Search />
              <Gift />
            </div>
          </div>
        )}
        {pathname !== "" && label !== "" && slug !== "" && (
          <div className="flex items-center justify-between py-2">
            <Link
              className=""
              href={slug}
              onClick={() => {
                updateHeader("", "");
              }}
            >
              <ChevronLeft className="size-5" />
            </Link>
            <div className="font-bold">{label}</div>
            <div className="size-5"></div>
          </div>
        )}
      </section>
      <section className="h-[80px]"></section>
    </React.Fragment>
  );
};

export default Header;
