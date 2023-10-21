"use client";

import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";
import {subscriptionRef} from "@/lib/converters/Subscription";
import {onSnapshot} from "@firebase/firestore";

const SubscriptionProvider = ({}) => {
  const { data: session } = useSession();

  useEffect(() => {
    if(!session) return;
    return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
      if(snapshot.empty) {
        console.log('No subscription of the user');
        return
      } else {
        console.log('User has subscription');
      }
    });
  }, [session]);

  return (
    <div>

    </div>
  );
};

export default SubscriptionProvider;
// by Rokas with ❤️
