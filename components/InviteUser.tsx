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

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

const InviteUser = ({chatId}: {chatId: string}) => {
  const {data: session} = useSession();
  const { toast } = useToast();
  const adminId = useAdminId({ chatId });
  const subscription = useSubscriptionStore((state) => state.subscription);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openInviteLink, setOpenInviteLink] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    }
  });


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(!session?.user.id) {
      return;
    }

    toast({
      title: 'Sending Invite',
      description: 'Please wait wile we send the invite',
    });

    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map((doc) => doc.data()).length;

    const isPro = subscription?.role === 'pro' && subscription.status === 'active';

    if (!isPro && noOfUsersInChat >= 2) {
      toast({
        title: 'Free plan limit exceeded',
        description: 'You have exceeded the plan limit',
        variant: 'destructive',
        action: (
          <ToastAction
          altText={"Upgrade"}
          onClick={() => router.push('/register')}
          >
            Upgrade to PRO
          </ToastAction>
        )
      });

      return;
    }

    const querySnapshot = await getDocs(getUserByEmailRef(values.email));

    if(querySnapshot.empty) {
      toast({
        title: 'User not found',
        description: 'User not found',
        variant: 'destructive'
      });
    } else {
      const user = querySnapshot.docs[0].data();
      await setDoc(addChatRef(chatId, user.id), {
        userId: user.id!,
        email: user.email!,
        timestamp: serverTimestamp(),
        chatId: chatId,
        isAdmin: false,
        image: user.image || "",
      }).then(() => {
        setOpen(false);

        toast({
          title: 'Added to chat',
          description: 'The user has been added to the chat list',
          className: 'bg-green-600 text-white',
          duration: 3000,
        });

        setOpenInviteLink(true);
      });
    }

    form.reset();
  }



  return (
    adminId === session?.user.id && (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircleIcon className="mr-1" />
              Add User To Chat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add User to Chat</DialogTitle>
              <DialogDescription>
                Simply enter another users email address to invite them to this chat! {" "}
                <span className="text-indigo-600 font-bold">(Note: they must be registered)</span>
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={'rokas@rokas.com'} {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                  />
                <Button className="ml-auto sm:w-fit w-full" type="submit">
                  Add To Card
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <ShareLink
          isOpen={openInviteLink}
          setIsOpen={setOpenInviteLink}
          chatId={chatId}
        />
      </>
    )
  );
};

export default InviteUser;
// by Rokas with ❤️
