"use client"

import React from 'react';
import {useSubscriptionStore} from "@/store/store";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

const UpgradeBanner = ({}) => {
  const subscription = useSubscriptionStore((state) => state.subscription);
  const isPro = subscription?.role === 'pro';
  const router = useRouter();

  if(subscription === undefined || isPro) return null;

  return (
    <Button className="w-full rounded-none bg-gradient-to-r from-[#777506] to-[#E935C1] text-center text-white px-5 py-2 hover:from-[#7775D6] hover:to-[#E935C1] hover:shadow-md hover:opacity-75 transition-all">
      Upgrade to Pro to unlock all features!
    </Button>
  );
};

export default UpgradeBanner;
// by Rokas with ❤️
