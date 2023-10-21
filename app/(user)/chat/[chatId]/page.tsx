import React from 'react';
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";
import ChatInput from "@/components/ChatInput";

type Props = {
  params: {
    chatId: string;
  }
}

const ChatPage = async ({params: {chatId}}: Props) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      {/* Admin controls */}
      {/* Chat members */}
      <ChatInput chatId={chatId} />
    </>
  );
};

export default ChatPage;
// by Rokas with ❤️
