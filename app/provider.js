"use client";
import UserDetailedContext from "@/context/UserDetailedContext";
import { supabase } from "@/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";

const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      console.error("Auth error:", authError);
      return;
    }

    const { data: Users, error: selectError } = await supabase
      .from("Users")
      .select("*")
      .eq("email", authUser.email);

    if (selectError) {
      console.error("Select error:", selectError);
      return;
    }

    if (!Users || Users.length === 0) {
      const { data, error: insertError } = await supabase
        .from("Users")
        .insert([
          {
            name:
              authUser.user_metadata?.full_name ||
              authUser.user_metadata?.name ||
              authUser.email?.split("@")[0], // fallback for email logins
            email: authUser.email,
            picture:
              authUser.user_metadata?.avatar_url ||
              authUser.user_metadata?.picture ||
              null,
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        return;
      }

      setUser(data);
    } else {
      setUser(Users[0]);
    }
  };

  return (
    <UserDetailedContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailedContext.Provider>
  );
};

export default SupabaseProvider;

export const useUser = () => {
  const context = useContext(UserDetailedContext);
  return context;
};
