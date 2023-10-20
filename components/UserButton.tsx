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
import {signIn, signOut} from 'next-auth/react';

const UserButton = ({session}: { session: Session | null}) => {
  // Subscription listerner
  if(!session) return (
    <Button variant={'outline'} onClick={() => signIn()} >
      Sign In
    </Button>
  )

  return session && (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          name={session.user?.name || 'Rokas Rudzianskas'}
          image={session.user?.image || 'https://pbs.twimg.com/profile_images/1350895249678348292/RS1Aa0iK_400x400.jpg'}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  );
};

export default UserButton;
// by Rokas with ❤️
