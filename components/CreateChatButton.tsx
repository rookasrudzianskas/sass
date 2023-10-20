"use client";

import React from 'react';
import {Button} from "@/components/ui/button";
import {MessageSquarePlusIcon, MessagesSquareIcon} from "lucide-react";
import {useRouter} from "next/navigation";

const CreateChatButton = ({}) => {
  const router = useRouter();
  const createNewChat = async () => {
    router.push('/chat/asb');
  }

  return (
    <Button variant={'ghost'}>
      <MessageSquarePlusIcon className="" />
    </Button>
  );
};

export default CreateChatButton;
// by Rokas with ❤️
