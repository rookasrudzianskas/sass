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
import {useSubscriptionStore} from "@/store/store";
import LoadingSpinner from "@/components/LoadingSpinner";
import {StarIcon} from "lucide-react";

const UserButton = ({session}: { session: Session | null}) => {
  const subscription = useSubscriptionStore((state) => state.subscription);

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

        {subscription === undefined && (
          <DropdownMenuItem>
            <LoadingSpinner />
          </DropdownMenuItem>
        )}

        {subscription?.role === "pro" && (
          <>
            <DropdownMenuLabel className="text-xs flex items-center justify-center space-x-1 text-[#E935C1] animate-pulse">
              <StarIcon fill="#E935C1" />
              <p>PRO</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              Manage
              {/*<ManageAccountButton />*/}
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  );
};

export default UserButton;
// by Rokas with ❤️
