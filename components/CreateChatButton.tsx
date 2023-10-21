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
import {setDoc, serverTimestamp, getDocs} from "@firebase/firestore";
import {addChatRef, chatMembersCollectionGroupRef} from "@/lib/converters/ChatMembers";
import {ToastAction} from "@/components/ui/toast";

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

    const noOfChats = (await getDocs(chatMembersCollectionGroupRef(session.user.id))).docs.map((doc) => doc.data()).length;

    const isPro = subscription?.role === 'pro' && subscription.status === 'active';

    if(!isPro && noOfChats >= 3) {
      toast({
        title: "Free plan limit exceeded",
        description: "Free plan limit exceeded",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Upgrade"
            onClick={() => router.push("/register")}
          >
            Upgrade to Pro
          </ToastAction>
        )
      });

      setLoading(false);
      return;
    }

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId: chatId,
      image: session.user.image || "",
    }).then(() => {
      toast({
        title: 'Success',
        description: 'You chat successfully created',
        className: "bg-green-600 text-white",
        duration: 2000,
      });
      router.push(`/chat/${chatId}`);
    }).catch((error) => {
      toast({
        title: 'Error',
        description: 'There was an error creating',
        variant: 'destructive',
        duration: 2000,
      });
    }).finally(() => {
      setLoading(false);
    });
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
    <Button onClick={createNewChat} variant={'ghost'}>
      <MessageSquarePlusIcon className="" />
    </Button>
  );
};

export default CreateChatButton;
// by Rokas with ❤️
