"use client";

import { useAuth } from "@/components/contexts/auth-provider";
import { Button } from "@/components/ui/button";
import { UserType } from "@/generated/prisma";
import { updateProfileType } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { BriefcaseBusiness, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

function Page() {
  const { user } = useAuth();

  if (user?.type) redirect("/user/profile");

  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [profileType, setProfileType] = useState<UserType | undefined>();

  const onContinue = async () => {
    try {
      if (!profileType) return;
      setIsLoading(true);
      await updateProfileType(profileType);
      session.update({ type: profileType });
      router.push("/user/settings/profile");
      setProfileType(undefined);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-3">
      <h2 className="text-2xl font-bold">Choose Profile Category</h2>
      <div className="flex items-center gap-3">
        <button
          disabled={isLoading}
          onClick={() => setProfileType(UserType.DEVELOPER)}
          className={cn(
            "flex flex-1 cursor-pointer flex-col items-center space-y-2 rounded-md border border-teal-900 p-5 hover:bg-teal-500/10",
            {
              "bg-teal-500/10": profileType === UserType.DEVELOPER
            }
          )}
        >
          <User />
          <p className="text-sm font-semibold">Developer</p>
        </button>
        <button
          disabled={isLoading}
          onClick={() => setProfileType(UserType.RECRUITER)}
          className={cn(
            "flex flex-1 cursor-pointer flex-col items-center space-y-2 rounded-md border border-teal-900 p-5 hover:bg-teal-500/10",
            {
              "bg-teal-500/10": profileType === UserType.RECRUITER
            }
          )}
        >
          <BriefcaseBusiness />
          <p className="text-sm font-semibold">Recruiter</p>
        </button>
      </div>
      <Button isLoading={isLoading} onClick={onContinue}>
        Continue
      </Button>
    </div>
  );
}

export default Page;
