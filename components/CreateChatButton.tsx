"use client";

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {MessageSquarePlusIcon, MessagesSquareIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {useSubscriptionStore} from "@/store/store";
import {useToast} from "@/components/ui/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import {v4 as uuidv4} from "uuid";

const CreateChatButton = ({isLarge}: {isLarge?: boolean}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const createNewChat = async () => {
    if(!session?.user.id) return;

    setLoading(true);
    toast({
      title: 'Creating a new chat...',
      description: "Creating a new chat",
      duration: 3000,
    });

    const chatId = uuidv4();




     router.push('/chat/asb');
  }

  if(isLarge) {
    return (
      <div>
        <Button variant={"default"} onClick={createNewChat}>
          {loading ? <LoadingSpinner /> : "Create a new Chat"}
        </Button>
      </div>
    )
  }

  return (
    <Button variant={'ghost'}>
      <MessageSquarePlusIcon className="" />
    </Button>
  );
};

export default CreateChatButton;
// by Rokas with ❤️
