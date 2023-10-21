import React from 'react';
import ChatList from "@/components/ChatList";

type Props = {
  params: {};
  searchParams: {
    error: string;
  }
}

const ChatPage = ({ searchParams: { error }}: Props) => {
  return (
    <div>
      <ChatList />
    </div>
  );
};

export default ChatPage;
// by Rokas with ❤️
