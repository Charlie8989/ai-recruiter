"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const signinWithGoogle = async () => {
    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        errorCallbackURL: "/auth",
      });

      if (error) {
        toast(error.message || "Unable to sign in with Google");
        setLoading(false);
      }
    } catch (error) {
      toast("Unable to sign in with Google");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 background-texture">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl">
        <img
          src="/login.svg"
          className="mx-auto w-48"
          alt="Login illustration"
        />

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome to BoloBoss
          </h2>
          <p className="text-sm text-gray-600">
            Authenticate with Google to continue
          </p>
        </div>

        <Button
          onClick={signinWithGoogle}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 bg-white py-6 font-semibold text-gray-900 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
        >
          {loading ? (
            <Loader2Icon className="h-5 w-5 animate-spin" />
          ) : (
            <img src="/google.webp" className="h-5 w-5" alt="Google logo" />
          )}
          {loading ? "Redirecting..." : "Login with Google"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
