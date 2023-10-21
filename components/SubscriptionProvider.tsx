"use client";

import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";
import {subscriptionRef} from "@/lib/converters/Subscription";
import {onSnapshot} from "@firebase/firestore";
import {useSubscriptionStore} from "@/store/store";

const SubscriptionProvider = ({children}: {children: React.ReactNode}) => {
  const { data: session } = useSession();
  const setSubscription = useSubscriptionStore((state) => state.setSubscription);

  useEffect(() => {
    if(!session) return;
    return onSnapshot(subscriptionRef(session?.user.id), (snapshot) => {
      if(snapshot.empty) {
        console.log('No subscription of the user');
        setSubscription(null)
        return
      } else {
        console.log('User has subscription');
        setSubscription(snapshot.docs[0].data())
      }
    }, (error) => {
      console.log(`Error: ${error}`);
    });
  }, [session, setSubscription]);

  return (
    <>
      {children}
    </>
  );
};

export default SubscriptionProvider;
// by Rokas with ❤️
