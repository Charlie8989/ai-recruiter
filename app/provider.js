"use client";
import UserDetailedContext from "@/context/UserDetailedContext";
import { authClient } from "@/lib/auth/client";
import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const CreateNewUser = useCallback(async () => {
    const authUser = session?.user;

    if (!authUser) {
      setUser(null);
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: authUser.name || authUser.email?.split("@")[0],
        email: authUser.email,
        picture: authUser.image || null,
      }),
    });

    if (!response.ok) {
      console.error("User sync error:", await response.text());
      return;
    }

    const data = await response.json();
    setUser(data.user);
  }, [session?.user]);

  useEffect(() => {
    if (!isPending) {
      CreateNewUser();
    }
  }, [CreateNewUser, isPending]);

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      navigate={router.push}
      Link={Link}
      redirectTo="/dashboard"
      social={{ providers: ["google"] }}
      credentials={{ forgotPassword: true }}
    >
      <UserDetailedContext.Provider value={{ user, setUser }}>
        {children}
      </UserDetailedContext.Provider>
    </NeonAuthUIProvider>
  );
};

export default AuthProvider;

export const useUser = () => {
  const context = useContext(UserDetailedContext);
  return context;
};
