"use client";

import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";

const SubscriptionProvider = ({}) => {
  const { data: session } = useSession();

  useEffect(() => {

  }, []);

  return (
    <div>

    </div>
  );
};

export default SubscriptionProvider;
// by Rokas with ❤️
