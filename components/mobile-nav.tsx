"use client";

import { useAuth } from "@/components/contexts/auth-provider";
import { UserType } from "@/generated/prisma";
import {
  BookOpen,
  Briefcase,
  Code,
  FileText,
  HelpCircle,
  Home,
  LogIn,
  LogOut,
  Menu,
  MessageCircleQuestionMark,
  Settings,
  Star,
  TableOfContents,
  TrendingUp,
  User,
  Users,
  Zap
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavItem from "./nav-item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "./ui/sheet";

export default function MobileNav() {
  const session = useSession();
  const { isAuthLoading, user: authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const isAuthenticated = session.status === "authenticated";

  const [quickActions, setQuickActions] = useState<
    { text: string; icon: React.ReactNode; href: string; variant: string }[]
  >([]);

  useEffect(() => {
    if (!isAuthLoading && authUser?.type) {
      if (authUser.type === UserType.DEVELOPER) {
        setQuickActions([
          {
            text: "Ask Question",
            icon: <Zap size={16} />,
            href: "/questions/create",
            variant: "default"
          },
          {
            text: "New Snippet",
            icon: <Code size={16} />,
            href: "/snippets/create",
            variant: "secondary"
          },
          {
            text: "My Jobs",
            icon: <Briefcase size={16} />,
            href: "/user/activity/jobs",
            variant: "secondary"
          }
        ]);
      }
      if (authUser.type === UserType.RECRUITER) {
        setQuickActions([
          {
            text: "Post Job",
            icon: <Star size={16} />,
            href: "/jobs/create",
            variant: "default"
          },
          {
            text: "New Snippet",
            icon: <Code size={16} />,
            href: "/snippets/create",
            variant: "secondary"
          },
          {
            text: "My Jobs",
            icon: <Briefcase size={16} />,
            href: "/user/activity/jobs",
            variant: "secondary"
          }
        ]);
      }
    }
  }, [isAuthLoading, authUser?.type]);

  const mainNavItems = [
    { text: "Home", icon: <Home size={16} />, href: "/" },
    {
      text: "Questions",
      icon: <MessageCircleQuestionMark size={16} />,
      href: "/questions"
    },
    { text: "Jobs", icon: <Briefcase size={16} />, href: "/jobs" },
    { text: "Blogs", icon: <FileText size={16} />, href: "/blogs" }
  ];

  const communityItems = [
    { text: "Members", icon: <Users size={16} />, href: "/users" },
    { text: "Learning", icon: <BookOpen size={16} />, href: "/learn" },
    { text: "Trending", icon: <TrendingUp size={16} />, href: "/trending" }
  ];

  const toolsItems = [
    { text: "Code Snippets", icon: <Code size={16} />, href: "/snippets" },
    { text: "Help Center", icon: <HelpCircle size={16} />, href: "/help" }
  ];

  const close = () => setOpen(false);

  return (
    <div className="flex h-[3.125rem] shrink-0 items-center justify-between border-b border-dashed px-4 md:hidden">
      <Link href="/" className="flex items-center gap-2">
        <Image
          width={24}
          height={24}
          alt="app-logo"
          src="/images/code.png"
        />
        <span className="font-bold">Dev Forum</span>
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="flex w-72 flex-col p-0">
          {/* Sheet Header */}
          <div className="flex h-[3.125rem] shrink-0 items-center gap-2 border-b border-dashed pr-10 pl-4">
            <Image
              width={24}
              height={24}
              alt="app-logo"
              src="/images/code.png"
            />
            <span className="font-bold">Dev Forum</span>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* User Profile */}
            {isAuthenticated && session.data?.user && (
              <div className="border-b border-dashed p-3">
                <div className="mb-3 flex items-center gap-3 rounded-lg border border-dashed bg-muted/30 p-2">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage
                      src={session.data.user.image as string}
                      alt={session.data.user.name as string}
                    />
                    <AvatarFallback>
                      {session.data.user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {session.data.user.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {session.data.user.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Link href="/user/profile" onClick={close}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-full justify-start gap-2 text-xs"
                    >
                      <User size={14} />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/user/activity" onClick={close}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-full justify-start gap-2 text-xs"
                    >
                      <TableOfContents size={14} />
                      Activity
                    </Button>
                  </Link>
                  <Link href="/user/settings/profile" onClick={close}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-full justify-start gap-2 text-xs"
                    >
                      <Settings size={14} />
                      Settings
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {quickActions.length > 0 && (
              <div className="border-b border-dashed p-3">
                <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">
                  Quick Actions
                </p>
                <div className="space-y-1.5">
                  {quickActions.map((action, idx) => (
                    <Button
                      key={idx}
                      size="sm"
                      variant={action.variant as any}
                      className="h-8 w-full justify-start text-xs"
                      asChild
                    >
                      <Link href={action.href} onClick={close}>
                        {action.icon}
                        <span className="ml-2">{action.text}</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Navigation */}
            <div className="p-3">
              <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">
                Main
              </p>
              <nav className="space-y-1">
                {mainNavItems.map((item) => (
                  <div key={item.href} onClick={close}>
                    <NavItem
                      collapsed={false}
                      icon={item.icon}
                      text={item.text}
                      href={item.href}
                      badge={null}
                    />
                  </div>
                ))}
              </nav>
            </div>

            {/* Community */}
            <div className="p-3">
              <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">
                Community
              </p>
              <nav className="space-y-1">
                {communityItems.map((item) => (
                  <div key={item.href} onClick={close}>
                    <NavItem
                      collapsed={false}
                      icon={item.icon}
                      text={item.text}
                      href={item.href}
                      badge={null}
                    />
                  </div>
                ))}
              </nav>
            </div>

            {/* Tools */}
            <div className="p-3">
              <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">
                Tools
              </p>
              <nav className="space-y-1">
                {toolsItems.map((item) => (
                  <div key={item.href} onClick={close}>
                    <NavItem
                      collapsed={false}
                      icon={item.icon}
                      text={item.text}
                      href={item.href}
                      badge={null}
                    />
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-dashed p-3">
            <div className="mb-2 flex items-center gap-2 px-1 text-xs text-zinc-500">
              <a
                href="mailto:shihabmd1970@gmail.com"
                className="hover:underline"
              >
                Contact Us
              </a>
              <span>•</span>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://github.com/saifulshihab/dev-forum"
                className="hover:underline"
              >
                GitHub
              </a>
            </div>
            {isAuthenticated ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-full justify-start gap-2 text-xs text-muted-foreground"
                onClick={async () => {
                  await signOut();
                  close();
                }}
              >
                <LogOut size={14} />
                Sign out
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-full justify-start gap-2 text-xs text-muted-foreground"
                onClick={() => {
                  signIn();
                  close();
                }}
              >
                <LogIn size={14} />
                Sign in
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
