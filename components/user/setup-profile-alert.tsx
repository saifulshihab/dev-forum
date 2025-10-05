"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../contexts/auth-provider";
import { Button } from "../ui/button";

function SetupProfileAlert() {
  const { isAuthLoading, isAuthenticated, user } = useAuth();

  if (isAuthLoading) return null;
  if (!isAuthenticated) return null;

  if (!user?.type) {
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
