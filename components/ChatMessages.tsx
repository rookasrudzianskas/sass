"use client";

import React, {createRef, useEffect} from 'react';
import {Message, sortedMessagesRef} from "@/lib/converters/Message";
import {Session} from "next-auth";
import {useLanguageStore} from "@/store/store";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {ChatMembers, chatMembersCollectionGroupRef} from "@/lib/converters/ChatMembers";

const ChatMessages = ({chatId, initialMessages, session}: {chatId: string, initialMessages: Message[], session: Session | null}) => {
  const language = useLanguageStore((state) => state.language);
  const messagesEndRef = createRef<HTMLDivElement>();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef(chatId),
    {
      initialValue: initialMessages
    }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div>

    </div>
  );
};

export default ChatMessages;
// by Rokas with ❤️
