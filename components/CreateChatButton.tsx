"use client";

import React from 'react';
import {Button} from "@/components/ui/button";
import {MessageSquarePlusIcon, MessagesSquareIcon} from "lucide-react";

const CreateChatButton = ({}) => {
  return (
    <Button variant={'ghost'}>
      <MessageSquarePlusIcon className="" />
    </Button>
  );
};

export default CreateChatButton;
// by Rokas with ❤️
