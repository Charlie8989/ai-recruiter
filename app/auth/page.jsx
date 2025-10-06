"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router=useRouter()
  const signinWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
       options: {
        redirectTo: `${window.location.origin}/dashboard`, // 👈 redirect here after login
      },
    });
    if (error) console.error(error);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-[#697dff] to-[#E5D5C0]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <img
          src="/login.svg"
          className="w-48 mx-auto"
          alt="Login illustration"
        />

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to BoloBoss
          </h2>
          <p className="text-sm text-gray-600">
            Authenticate with Google to continue
          </p>
        </div>

        <Button
          onClick={signinWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 border-2 border-gray-200 font-semibold py-6 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 hover:bg-transparent transition-all"
        >
          <img src="/google.png" className="w-5 h-5" alt="Google logo" />
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
