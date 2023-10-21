"use client";

import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";
import {Session} from "next-auth";
import {auth} from "@/firebase";
import {signInWithCustomToken} from "@firebase/auth";

const FirebaseAuthProvider = ({children}: { children: React.ReactNode}) => {
  const { data: session } = useSession();

  async function syncFirebaseAuth(session: Session) {
    if(session && session.firebaseToken) {
      try {
        await signInWithCustomToken(auth, session.firebaseToken);
      } catch (e) {
        console.log(e);
      }
    } else {
      auth.signOut();
    }
  }

  useEffect(() => {
    if(!session) return;
    syncFirebaseAuth(session);
  }, [session])

  return (
    <>
      {children}
    </>
  );
};

export default FirebaseAuthProvider;
// by Rokas with ❤️
