import React from 'react';
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";
import {getDocs} from "@firebase/firestore";
import {chatMembersCollectionGroupRef} from "@/lib/converters/ChatMembers";
import ChatListRows from "@/components/ChatListRows";

const ChatList = async ({}) => {
  const session = await getServerSession(authOptions);

  const chatsSnapshot = await getDocs(chatMembersCollectionGroupRef(session?.user.id!));

  const initialChats = chatsSnapshot.docs.map((doc => ({
    ...doc.data(),
    timestamp: null,
  })));

  return (
    <ChatListRows initialChats={initialChats} />
  );
};

export default ChatList;
// by Rokas with ❤️
