"use client";

import { useHeaderContext } from "@/context/HeaderContext";
import { Ticket } from "lucide-react";
import * as React from "react";

export default function MyCoupons() {
  const { updateHeader } = useHeaderContext();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    updateHeader("My coupons", "/profile");
  }, []);

  return (
    <section className="mt-8 flex flex-col px-4 space-y-8 min-h-max items-center">
      {data.length < 1 && (
        <div className="flex flex-col items-center mt-[50%]">
          <Ticket className="size-16" />
          <div className="text-2xl">No Coupons Yet</div>
          <div className="">Stay active to receive new rewards and coupons soon!</div>
        </div>
      )}
    </section>
  );
}
