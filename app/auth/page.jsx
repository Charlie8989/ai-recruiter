"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect } from "react";

const Login = () => {
  const signinWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) console.log(error);
  };

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data }) => {
  //     console.log("Session:", data);
  //   });
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center w-[40vw] sm:w-[20vw]  border-1 border-gray-400 rounded-md px-5 py-2">
        <img src="/logo.png" className="w-7 h-7" alt="" />
        <img
          src="/login.svg"
          className=" w-[40vw] sm:w-[20vw] rounded-md"
          alt="Login"
        />
        <h2 className="text-md font-semibold mt-3 sm:mt-1">
          Welcome To BoloBoss
        </h2>
        <p className="text-xs font-semibold mt-3 sm:mt-1">
          Authenticate With Google
        </p>
        <Button
          onClick={signinWithGoogle}
          className="w-full flex gap-3 sm:gap-4 my-3"
        >
          <img src="/google.png" className="w-5 h-5" alt="google logo" />
          Login With google
        </Button>
      </div>
    </div>
  );
};

export default Login;
