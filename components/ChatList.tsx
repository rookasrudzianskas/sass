import React from 'react';
import {authOptions} from "@/auth";
import {getServerSession} from "next-auth";
import {getDocs} from "@firebase/firestore";

const ChatList = async ({}) => {
  const session = await getServerSession(authOptions);

  // const chatsSnapshot = await getDocs(chatMembersCollectionGroupref(session?.user.id!));
  
  return (
    <div>

    </div>
  );
};

export default ChatList;
// by Rokas with ❤️
