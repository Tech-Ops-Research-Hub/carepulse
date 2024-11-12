'use client'

import { AuthContext } from "@/context/authContext";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<AuthContext>{children}</AuthContext>);
}