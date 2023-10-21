import React from 'react';
import InviteUser from "@/components/InviteUser";
import DeleteUserChatButton from "@/components/DeleteUserChatButton";

const AdminControls = ({chatId}: {chatId: string}) => {
  return (
    <div className="flex justify-end space-x-2 m-5 mb-0">
      <InviteUser chatId={chatId} />
      <DeleteUserChatButton chatId={chatId} />
    </div>
  );
};

export default AdminControls;
// by Rokas with ❤️
