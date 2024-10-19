"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHeaderContext } from "@/context/HeaderContext";
import * as React from "react";

export default function Referrals() {
  const { updateHeader } = useHeaderContext();

  React.useEffect(() => {
    updateHeader("Referrals", "/profile");
  }, []);

  return (
    <section className="mt-8 flex flex-col px-4 space-y-8">
      <div className="flex flex-col">
        <div className="">Share invitation code</div>
        <div className="text-gray-400 text-xs">Invite your friends and earn 250 bonuses for each one you refer</div>
        <div className="flex flex-col mt-5 py-[6px] px-4">
          <div className="text-gray-400 text-xs">Referral code</div>
          <div className="">8FDSJK29K</div>
        </div>
        <Button className="bg-red-500 hover:bg-red-400 w-full h-14 rounded-full">Copy</Button>
      </div>
      <div className="flex flex-col">
        <div className="">Apply invitation code</div>
        <div className="text-gray-400 text-xs">Use the code received from another user or from the promotion</div>
        <div className="mt-5 flex flex-col space-y-3">
          <Input placeholder="Invitation code" className="placeholder:text-gray-400 bg-transparent" />
          <Button className="bg-red-500 hover:bg-red-400 w-full h-14 rounded-full">Copy</Button>
        </div>
      </div>
    </section>
  );
}
