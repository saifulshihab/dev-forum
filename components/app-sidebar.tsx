"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserType } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Briefcase,
  ChevronsUpDown,
  Code,
  HelpCircle,
  Home,
  LogIn,
  LogOut,
  MessageCircleQuestionMark,
  PanelRightClose,
  PanelRightOpen,
  Search,
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
import React, { useEffect, useState } from "react";
import { useAuth } from "./contexts/auth-provider";
import NavItem from "./nav-item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

export function AppSidebar() {
  const { isAuthLoading, user: authUser } = useAuth();
  const session = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
    {
      text: "Home",
      icon: <Home size={16} />,
      href: "/",
      badge: null
    },
    {
      text: "Questions",
      icon: <MessageCircleQuestionMark size={16} />,
      href: "/questions",
      badge: null
    },
    {
      text: "Jobs",
      icon: <Briefcase size={16} />,
      href: "/jobs",
      badge: null
    }
  ];

  const communityItems = [
    {
      text: "Members",
      icon: <Users size={16} />,
      href: "/users",
      badge: null
    },
    {
      text: "Learning",
      icon: <BookOpen size={16} />,
      href: "/learn",
      badge: null
    },
    {
      text: "Trending",
      icon: <TrendingUp size={16} />,
      href: "/trending",
      badge: null
    }
  ];

  const toolsItems = [
    {
      text: "Code Snippets",
      icon: <Code size={16} />,
      href: "/snippets",
      badge: null
    },
    {
      text: "Help Center",
      icon: <HelpCircle size={16} />,
      href: "/help",
      badge: null
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`border-l border-r border-dashed transition-all duration-300 ${
        sidebarOpen ? "w-64 shrink-0" : "w-16 shrink-0"
      }`}
    >
      {/* Header */}
      <div className="group relative flex h-[3.125rem] items-center justify-center border-b border-dashed">
        <div className="inline-flex items-center gap-2 self-center">
          <Image
            width={24}
            height={24}
            alt="app-logo"
            src={"/images/code.png"}
          />
          <p className={`line-clamp-1 font-bold ${!sidebarOpen && "hidden"}`}>
            Dev Forum
          </p>
        </div>
        <button
          onClick={toggleSidebar}
          className="absolute right-[-2px] transform rounded-md p-1 opacity-0 transition-all group-hover:opacity-100 active:scale-90"
        >
          {sidebarOpen ? (
            <PanelRightOpen size={16} />
          ) : (
            <PanelRightClose size={16} />
          )}
        </button>
      </div>
      {/* Search Bar */}
      {sidebarOpen && (
        <div className="border-b border-dashed p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="h-8 border-dashed bg-muted/50 pl-9 text-sm"
            />
          </div>
        </div>
      )}
      {/* User Profile Section */}
      {sidebarOpen ? (
        isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="border-b border-dashed p-3">
                <div className="flex items-center justify-between rounded-lg border border-dashed bg-muted/30 p-2 hover:bg-muted/50">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                      <Avatar>
                        <AvatarImage
                          src={session.data.user?.image as any}
                          alt={session.data.user?.name as any}
                        />
                        <AvatarFallback>
                          {session.data.user?.name}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {session.data.user?.name}
                      </p>
                      {session.data.user?.email ? (
                        <div>
                          <p className="min-w-0 truncate text-xs text-muted-foreground">
                            {session.data.user?.email}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <ChevronsUpDown className="h-4 w-4 text-zinc-200" />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="start"
              className="m-auto w-56"
            >
              <DropdownMenuGroup>
                <Link href="/user/profile">
                  <DropdownMenuItem>
                    <User />
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <Link href="/user/activity">
                  <DropdownMenuItem>
                    <TableOfContents />
                    Activity
                    <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <Link href="/user/settings/profile">
                  <DropdownMenuItem>
                    <Settings />
                    Settings
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={async () => await signOut()}>
                <LogOut />
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null
      ) : null}
      {/* Quick Actions */}
      {sidebarOpen && quickActions.length > 0 && (
        <div className="border-b border-dashed p-3">
          <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">
            Quick Actions
          </p>
          <div className="space-y-2">
            {quickActions.map((action, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={action.variant as any}
                className="h-8 w-full justify-start text-xs"
                asChild
              >
                <Link href={action.href}>
                  {action.icon}
                  <span className="ml-2">{action.text}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Main Navigation */}
      <div
        className={cn("h-[calc(100vh-10.8125rem)] overflow-y-auto", {
          "h-[calc(100vh-21.6875rem)]": isAuthenticated
        })}
      >
        <div className="p-3">
          <p
            className={`mb-2 px-1 text-xs font-medium text-muted-foreground ${!sidebarOpen && "hidden"}`}
          >
            Main
          </p>
          <nav className="space-y-1">
            {mainNavItems.map((item, idx) => (
              <NavItem
                key={idx}
                icon={item.icon}
                text={item.text}
                href={item.href}
                badge={item.badge}
                collapsed={!sidebarOpen}
              />
            ))}
          </nav>
        </div>
        {/* Community Section */}
        <div className="p-3">
          <p
            className={`mb-2 px-1 text-xs font-medium text-muted-foreground ${!sidebarOpen && "hidden"}`}
          >
            Community
          </p>
          <nav className="space-y-1">
            {communityItems.map((item, idx) => (
              <NavItem
                key={idx}
                icon={item.icon}
                text={item.text}
                href={item.href}
                badge={item.badge}
                collapsed={!sidebarOpen}
              />
            ))}
          </nav>
        </div>
        {/* Tools Section */}
        <div className="p-3">
          <p
            className={`mb-2 px-1 text-xs font-medium text-muted-foreground ${!sidebarOpen && "hidden"}`}
          >
            Tools
          </p>
          <nav className="space-y-1">
            {toolsItems.map((item, idx) => (
              <NavItem
                key={idx}
                icon={item.icon}
                text={item.text}
                href={item.href}
                collapsed={!sidebarOpen}
                badge={item.badge}
              />
            ))}
          </nav>
        </div>
      </div>
      {/* Settings */}
      {sidebarOpen ? (
        <div className="flex items-center gap-2 px-4 text-xs text-zinc-500">
          <a
            href="mailto:shihabmd1970@gmail.com"
            className="cursor-pointer hover:underline"
          >
            Contact Us
          </a>
          <span>•</span>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/saifulshihab/dev-forum"
            className="cursor-pointer hover:underline"
          >
            GitHub
          </a>
        </div>
      ) : null}
      {!isAuthenticated && sidebarOpen ? (
        <div className="flex h-[3.125rem] items-center border-t border-dashed">
          <Button
            variant="link"
            className="text-muted-foreground hover:text-white hover:no-underline"
            onClick={() => signIn()}
          >
            <LogIn className="mr-2" />
            Sign in
          </Button>
        </div>
      ) : null}
    </div>
  );
}
