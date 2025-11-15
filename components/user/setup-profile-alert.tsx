import { nextAuthOptions } from "@/auth";
import { getCurrentUser } from "@/lib/actions";
import { Info } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "../ui/button";

async function SetupProfileAlert() {
  const session = await getServerSession(nextAuthOptions);
  const user = await getCurrentUser();
  const isAuthenticated = !!session?.user;
  if (isAuthenticated && !user?.type) {
    return (
      <div className="flex items-center justify-between gap-3 bg-teal-500/10 px-4 py-2">
        <div className="inline-flex items-center text-teal-300">
          <Info className="h-3" />
          <p className="text-xs">
            Set up your profile to get personalized experience.
          </p>
        </div>
        <Button type="button" size="sm" asChild>
          <Link href="/user/type">Setup Profile</Link>
        </Button>
      </div>
    );
  }

  return null;
}

export default SetupProfileAlert;
