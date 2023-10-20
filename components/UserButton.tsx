"use client"

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "@/components/UserAvatar";
import {Session} from "next-auth";
import {Button} from "@/components/ui/button";
import { signIn } from 'next-auth/react';

const UserButton = ({session}: { session: Session | null}) => {
  if(!session) return (
    <Button variant={'outline'} onClick={() => signIn()} >
      Sign In
    </Button>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={'Rokas'}
          image={'https://yt3.googleusercontent.com/IQ4OqurVrPmACaf3h5fgTcRInn6QoHz0xN4O5qzhuhY7UKgpDg2A4mGyhWW5vcaGSiVbf_FLdQ=s900-c-k-c0x00ffffff-no-rj'}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  );
};

export default UserButton;
// by Rokas with ❤️
