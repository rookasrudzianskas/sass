"use client";

import React from 'react';
import {ChatMembers, chatMembersRef} from "@/lib/converters/ChatMembers";
import {useCollectionData} from "react-firebase-hooks/firestore";

const ChatMembersBadge = ({chatId}: {chatId: string}) => {
  const [members, loading, error] = useCollectionData<ChatMembers>(
    chatMembersRef(chatId)
  );

  return (
    <div>

    </div>
  );
};

export default ChatMembersBadge;
// by Rokas with ❤️
