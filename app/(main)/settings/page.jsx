"use client";
import { useUser } from "@/app/provider";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const { user } = useUser();
  const credits = user?.credits;
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const proceedtoBuy = () => {
    router.push("/settings/buy-credits");
  };
  return (
    <div>
      <div className="w-full p-5">
        <div className="flex justify-evenly gap-4 items-center sm:flex-row flex-col">
          <div className="flex sm:flex-row flex-col gap-4 items-center">
            <img
              src={
                user?.picture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3YkerCVdYtyi2McC6l-feLDSDl2KDOzFig&s"
              }
              className="cursor-pointer w-20 h-20 rounded-full"
              alt="User Picture"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-2xl font-bold ">{user?.name || "Name"}</p>
              <p>{user?.email || "Email"}</p>
            </div>
          </div>
          <Button
            className="bg-[#CA2A30] border-2 border-[#DB3C42] hover:bg-[#DB3C42] "
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
        <div className="bg-white rounded-md w-[70vw] sm:w-[50vw] mx-auto sm:my-6 my-3">
          <div className="px-5 py-3">
            <p className="text-lg gap-x-2">
              Credits Left :
              <span className="text-md ml-3 ">{credits || "0"}</span>
            </p>

            {credits === 0 && (
              <div className="text-red-500 font-semibold text-center text-sm w-full">
                Oops! You’re out of credits
              </div>
            )}
          </div>
          <div onClick={proceedtoBuy} className="w-full text-center">
            <Button className={"w-1/2 mb-6"}>$ Buy Credits</Button>
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold my-8">Thanks for using BOLOBOSS ❤️</p>
        </div>
      </div>
    </div>
  );
};

export default page;
