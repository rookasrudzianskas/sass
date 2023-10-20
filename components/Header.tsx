import React from 'react';
import Logo from "@/components/Logo";
import {DarkModeToggle} from "@/components/DarkModeToggle";
import UserButton from "@/components/UserButton";
import {getServerSession} from "next-auth";
import {authOptions} from "@/auth";
import Link from "next/link";
import {MessagesSquareIcon} from "lucide-react";
import CreateChatButton from "@/components/CreateChatButton";

const Header = async ({}) => {
  const session = await getServerSession(authOptions);
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo/>
        <div className="flex flex-1 items-center justify-end space-x-4">

          {session ? (
            <>
              <Link href={'/chat'} prefetch={false}>
                <MessagesSquareIcon className="text-black dark:text-white" />
              </Link>
              <CreateChatButton />
            </>
          ) : (
            <Link href={'/pricing'}>
              Pricing
            </Link>
          )}

          <DarkModeToggle/>
          <UserButton session={session} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
// by Rokas with ❤️
