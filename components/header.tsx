"use client";

import { LogInIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

function Header() {
  const session = useSession();
  const isAuthLoading = session.status === "loading";
  const isAuthenticated = session.status === "authenticated";
  return (
    <div className="flex h-[3.125rem] shrink-0 justify-end border-b border-dashed px-4">
      <div className="inline-flex items-center gap-2">
        {isAuthLoading ? (
          <Skeleton className="h-8 w-8 rounded-full" />
        ) : isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={session.data.user?.image as any}
                  alt={session.data.user?.name || "dp"}
                />
                <AvatarFallback>{session.data.user?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <Link href="/user/profile">
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <Link href="/user/settings/profile">
                  <DropdownMenuItem>
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Sign out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn()} variant="ghost">
            <LogInIcon />
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
