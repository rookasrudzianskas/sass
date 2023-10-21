import React from 'react';
import {Alert, AlertDescription, AlertTitle} from './ui/alert';
import {AlertCircle, Terminal} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const ChatPermissionError = ({}) => {
  return (
    <Alert variant={'destructive'}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription className="flex justify-between items-center">
        <p className="flex">
          You do not have permission to view this chat.
          <br />
          <span className="font-bold">
            Please ask the chat admin to add you to the chat
          </span>
        </p>

        <Link href={'/chat'}>
          <Button variant={"destructive"}>
            Dismiss
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
};

export default ChatPermissionError;
// by Rokas with ❤️
