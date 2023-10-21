"use client";

import React, {useEffect, useState} from 'react';
import {getDocs} from "@firebase/firestore";
import {chatMemberAdminRef} from "@/lib/converters/ChatMembers";

const useAdminId = ({chatId}: {chatId: string}) => {
  const [adminId, setAdminId] = useState<string>("");

  useEffect(() => {
    const fetchAdminStatus = async () => {
      const adminId = (await getDocs(chatMemberAdminRef(chatId))).docs.map((doc) => doc.id)[0];
      setAdminId(adminId);
    }
    fetchAdminStatus();
  }, [chatId]);

  return adminId;
};

export default useAdminId;
// by Rokas with ❤️
