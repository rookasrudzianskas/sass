"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {useSession} from "next-auth/react";
import * as z from "zod";
import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, Form, FormMessage} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import {Button} from "@/components/ui/button";
import {addDoc, getDocs, setDoc} from "@firebase/firestore";
import {limitedMessagesRef, messagesRef, User} from "@/lib/converters/Message";
import { serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import {useSubscriptionStore} from "@/store/store";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";
import useAdminId from "@/hooks/useAdminId";
import {PlusCircleIcon} from "lucide-react";
import {addChatRef, chatMembersRef} from "@/lib/converters/ChatMembers";
import {getUserByEmailRef} from "@/lib/converters/User";
import ShareLink from "@/components/ShareLink";

const DeleteUserChatButton = ({chatId}: {chatId: string}) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const adminId = useAdminId({chatId});

  const handleDelete = () => {
    toast({
      title: "Deleting Chat",
      description: "Please wait while we delete the chat...",
    });

    console.log('Deleting chat', chatId);
  }

  return (
    session?.user.id === adminId && (
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button variant={'destructive'}>
            Delete Chat
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This will delete the chat for all users.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 space-x-2">
            <Button variant={'destructive'} onClick={handleDelete}>
              Delete
            </Button>

            <Button variant={'outline'} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default DeleteUserChatButton;
// by Rokas with ❤️
