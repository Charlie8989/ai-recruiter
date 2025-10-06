"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { Progress } from "@/components/ui/progress";


const page = () => {
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState();
  const router = useRouter();
  // console.log(user?.user_metadata)

  useEffect(() => {
    const fetchUserAndCredits = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: Users, error } = await supabase
          .from("Users")
          .select("credits")
          .eq("email", user.user_metadata?.email);
        if (error) console.error(error);
        else setCredits(Users[0].credits);
      }
    };

    fetchUserAndCredits();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return console.error(error);
    router.push("/");
  };

  const proceedtoBuy=()=>{
    router.push('/settings/buy-credits')
  }
  return (
    <div>
     <div className="w-full p-5">
        <div className="flex justify-evenly gap-4 items-center sm:flex-row flex-col">
          <div className="flex sm:flex-row flex-col gap-4 items-center">
            <img
              src={user?.user_metadata?.avatar_url||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3YkerCVdYtyi2McC6l-feLDSDl2KDOzFig&s"
              }
              className="cursor-pointer w-20 h-20 rounded-full"
              alt="User Picture"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-2xl font-bold ">
                {user?.user_metadata?.full_name || "Name"}
              </p>
              <p>{user?.user_metadata?.email || "Email"}</p>
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
          <div className="p-5">
            <p className="text-lg gap-x-2">
              Credits Left :
              <span className="text-md ml-3 ">
                {credits || "0"}/{credits || "0"}
              </span>
            </p>
            <Progress
              className="sm:mt-3 mt-1"
              value={((3 - credits) / 3) * 100}
            />
          </div>
          <div onClick={proceedtoBuy} className="w-full text-center">
            <Button className={"w-1/2 mb-6"}>$ Buy Credits</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
