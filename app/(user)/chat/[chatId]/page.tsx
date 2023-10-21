import React from 'react';
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";
import ChatInput from "@/components/ChatInput";
import {getDocs} from "@firebase/firestore";
import {sortedMessagesRef} from "@/lib/converters/Message";
import ChatMessages from "@/components/ChatMessages";
import ChatMembersBadge from "@/components/ChatMembersBadge";

type Props = {
  params: {
    chatId: string;
  }
}

const ChatPage = async ({params: {chatId}}: Props) => {
  const session = await getServerSession(authOptions);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map((doc) => doc.data());

  return (
    <>
      {/* Admin controls */}
      {/* Chat members */}
      <ChatMembersBadge />
      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>
      <ChatInput chatId={chatId} />
    </>
  );
};

export default ChatPage;
// by Rokas with ❤️
