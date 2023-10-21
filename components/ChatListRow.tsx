"use client";

import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import {useCollectionData} from "react-firebase-hooks/firestore";

const ChatListRow = ({chatId}: {chatId: string}) => {
  const [messages, loading, error] = useCollectionData<Message>(
    limitedSortedMessagesRef(chatId)
  )
  return (
    <div>
      Hello!
    </div>
  );
};

export default ChatListRow;
// by Rokas with ❤️
