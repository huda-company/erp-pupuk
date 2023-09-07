"use client";
import ReduxProvider from "@/redux/ReduxProvider";
import { persistor, store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
