"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Briefcase,
  Code,
  HelpCircle,
  Home,
  Layers,
  LogIn,
  LogOut,
  MessageCircle,
  PanelRightClose,
  PanelRightOpen,
  Search,
  Settings,
  Star,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NavItem from "./nav-item";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function AppSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const session = useSession();
  const isAuthLoading = session.status === "loading";
  const isAuthenticated = session.status === "authenticated";
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const mainNavItems = [
    {
      text: "Home",
      icon: <Home size={16} />,
      href: "/",
      badge: null
    },
    {
      text: "Questions",
      icon: <MessageCircle size={16} />,
      href: "/questions",
      badge: null
    },
    {
      text: "Projects",
      icon: <Layers size={16} />,
      href: "/projects",
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
      href: "/members",
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

  const quickActions = [
    {
      text: "Ask Question",
      icon: <Zap size={16} />,
      href: "/questions/create",
      variant: "default" as const
    },
    {
      text: "Post Project",
      icon: <Star size={16} />,
      href: "/projects/create",
      variant: "secondary" as const
    }
  ];

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
          className="absolute right-[-2px] transform rounded-md p-1 opacity-0 transition-all active:scale-90 group-hover:opacity-100"
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
          <Link href="/user/profile">
            <div className="border-b border-dashed p-3">
              <div className="group flex items-center justify-between rounded-lg border border-dashed bg-muted/30 p-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                    <Avatar>
                      <AvatarImage
                        src={session.data.user?.image as any}
                        alt={session.data.user?.name as any}
                      />
                      <AvatarFallback>{session.data.user?.name}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {session.data.user?.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {session.data.user?.name}
                    </p>
                  </div>
                </div>
                <div className="translate-x-4 transform opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => signOut()}
                      >
                        <LogOut className="h-4 w-4 text-zinc-400" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Logout</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Link>
        ) : null
      ) : null}
      {/* Quick Actions */}
      {sidebarOpen && (
        <div className="border-b border-dashed p-3">
          <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">
            Quick Actions
          </p>
          <div className="space-y-2">
            {quickActions.map((action, idx) => (
              <Button
                key={idx}
                variant={action.variant}
                size="sm"
                className="h-8 w-full justify-start text-xs"
                asChild
              >
                <a href={action.href}>
                  {action.icon}
                  <span className="ml-2">{action.text}</span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Main Navigation */}
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
              collapsed={!sidebarOpen}
              badge={item.badge}
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
              collapsed={!sidebarOpen}
              badge={item.badge}
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
      {/* Settings */}
      {isAuthenticated ? (
        <div className="mt-auto p-3">
          <NavItem
            icon={<Settings size={16} />}
            text="Settings"
            href="/user/settings/profile"
            collapsed={!sidebarOpen}
            badge={null}
          />
        </div>
      ) : (
        sidebarOpen && (
          <div className="absolute bottom-0 flex items-center justify-center p-3">
            <Button
              variant="link"
              className="w-full text-muted-foreground hover:no-underline"
              onClick={() => signIn()}
            >
              <LogIn />
              Sign in
            </Button>
          </div>
        )
      )}
    </div>
  );
}
