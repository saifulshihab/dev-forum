import ActivityFeed from "@/components/home/activity-feed";
import CommunityHighlights from "@/components/home/community-highlights";
import CommunityStats from "@/components/home/community-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getCommunityActivity,
  getCommunityStats
} from "@/lib/actions/home-actions";
import {
  BookOpen,
  Briefcase,
  Lightbulb,
  MessageCircle,
  Rocket,
  Users
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const quickActions = [
  {
    title: "Ask a Question",
    description: "Get help from the community",
    icon: <MessageCircle className="h-6 w-6" />,
    href: "/questions/create",
    color: "border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20"
  },
  {
    title: "Browse Projects",
    description: "Find freelance opportunities",
    icon: <Briefcase className="h-6 w-6" />,
    href: "/projects",
    color: "border-green-500/20 bg-green-500/10 hover:bg-green-500/20"
  },
  {
    title: "Job Board",
    description: "Explore career opportunities",
    icon: <Users className="h-6 w-6" />,
    href: "/jobs",
    color: "border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20"
  },
  {
    title: "Learning Hub",
    description: "Access tutorials and guides",
    icon: <BookOpen className="h-6 w-6" />,
    href: "/learn",
    color: "border-orange-500/20 bg-orange-500/10 hover:bg-orange-500/20"
  }
];

export default async function Home() {
  const [activities, stats] = await Promise.all([
    getCommunityActivity(),
    getCommunityStats()
  ]);
  return (
    <div className="flex flex-col gap-6 p-3">
      {/* Welcome Section */}
      <Card className="border-dashed bg-gradient-to-r from-blue-500/10 to-teal-500/10">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Rocket className="h-7 w-7 text-blue-400" />
            Welcome to Dev Forum
          </CardTitle>
          <CardDescription className="text-lg">
            Connect, learn, and grow with developers worldwide. Ask questions,
            share knowledge, and discover opportunities.
          </CardDescription>
        </CardHeader>
      </Card>
      {/* Community Stats */}
      <Suspense
        fallback={
          <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className="h-20 border-dashed bg-zinc-800"
                  />
                ))}
            </div>
            {/* Trending Topics */}
            {stats?.trendingTopics && stats.trendingTopics.length > 0 && (
              <Card className="border-dashed">
                <CardHeader className="pb-3">
                  <Skeleton className="h-[1.75rem] w-40 bg-zinc-800" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <Skeleton
                          key={idx}
                          className="h-[22px] w-20 bg-zinc-800"
                        />
                      ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        }
      >
        <CommunityStats stats={stats as any} />
      </Suspense>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Quick Actions & Featured Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Quick Actions */}
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Get started quickly with these common actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Card
                      className={`cursor-pointer border-dashed transition-all duration-200 ${action.color}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-background/50 p-2">
                            {action.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Community Highlights */}
          <Suspense
            fallback={
              <Card className="border-dashed">
                <CardHeader>
                  <Skeleton className="h-6 w-[40%] bg-zinc-800" />
                  <Skeleton className="[50%] h-5 bg-zinc-800" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Skeleton className="h-[6.875rem] rounded-lg border border-dashed bg-zinc-800 p-4" />
                    <Skeleton className="h-[6.875rem] rounded-lg border border-dashed bg-zinc-800 p-4" />
                    <Skeleton className="h-[6.875rem] rounded-lg border border-dashed bg-zinc-800 p-4" />
                  </div>
                </CardContent>
              </Card>
            }
          >
            <CommunityHighlights />
          </Suspense>
        </div>
        {/* Right Column - Activity Feed */}
        <div className="lg:col-span-1">
          <Suspense
            fallback={
              <Card className="border-dashed">
                <CardHeader className="pb-3">
                  <Skeleton className="h-[1.75rem] w-[90%] bg-zinc-800" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-[8.5rem] w-full bg-zinc-800" />
                  <Skeleton className="h-[8.5rem] w-full bg-zinc-800" />
                  <Skeleton className="h-[8.5rem] w-full bg-zinc-800" />
                  <Skeleton className="h-[8.5rem] w-full bg-zinc-800" />
                </CardContent>
              </Card>
            }
          >
            <ActivityFeed activities={activities as any} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
