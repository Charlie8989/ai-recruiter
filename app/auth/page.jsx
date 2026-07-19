import { AuthView } from "@neondatabase/auth/react";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white/10 px-4 background-texture">
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
          <p className="text-sm text-gray-600">Sign in to continue</p>
        </div>

        <AuthView path="sign-in" />
      </div>
    </div>
  );
};

export default Login;
