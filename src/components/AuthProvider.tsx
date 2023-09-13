"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

import ReduxProvider from "@/redux/ReduxProvider";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  return (
    <SessionProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </SessionProvider>
  );
}
