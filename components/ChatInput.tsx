"use client";

import React from 'react';
import {useSession} from "next-auth/react";
import * as z from "zod";
import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, Form} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import {Button} from "@/components/ui/button";
import {addDoc, getDocs} from "@firebase/firestore";
import {limitedMessagesRef, messagesRef, User} from "@/lib/converters/Message";
import { serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import {useSubscriptionStore} from "@/store/store";
import {useToast} from "@/components/ui/use-toast";
import {ToastAction} from "@/components/ui/toast";

const formSchema = z.object({
  input: z.string().max(1000)
});

const ChatInput = ({chatId}: {chatId: string}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const toast = useToast();
  const subscription = useSubscriptionStore((state) => state.subscription);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if(values.input.length === 0) {
      return;
    }

    if(!session?.user) {
      return;
    }

    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map((doc) => doc.data()).length;

    const isPro = subscription?.role === 'pro' && subscription.status === 'active';

    if(!isPro && messages >= 20) {
      toast({
        title: "Free plan limit exceeded",
        description: 'You have exceeded the plan limit. Upgrade to Pro',
        variant: "destructive",
        action: (
          <ToastAction
            altText={'Upgrade'}
            onClick={() => router.push('/register')}
          >
           Upgrade to PRO
          </ToastAction>
        )
      })
    }

    const userToStore: User = {
      id: session.user.id!,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };

    addDoc(messagesRef(chatId), {
      input: values.input,
      timestamp: serverTimestamp(),
      user: userToStore,
    });

    form.reset();
  }

  return (
    <div className="sticky bottom-0">
      <Form {...form}>
        <form
          onClick={form.handleSubmit(onSubmit)}
          className="flex space-x-2 p-2 rounded-t-xl max-w-4xl mx-auto bg-white border dark:bg-slate-800">
          <FormField
              control={form.control}
              name="input"
              render={({field}) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input className="border-none bg-transparent dark:placeholder:text-white/70" placeholder={"Entermessage in any language"} {...field} />
                  </FormControl>
                </FormItem>
              )}
              />
          <Button type={'submit'} className="bg-violet-600 text-white">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
// by Rokas with ❤️
