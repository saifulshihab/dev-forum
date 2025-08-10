import ActivityFeed from "@/components/home/activity-feed";
import CommunityStats from "@/components/home/community-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getCommunityActivity, getCommunityStats } from "@/lib/data";
import {
  BookOpen,
  Briefcase,
  Lightbulb,
  MessageCircle,
  Rocket,
  Users
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const [activities, stats] = await Promise.all([
    getCommunityActivity(),
    getCommunityStats()
  ]);

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

  return (
    <div className="flex flex-col gap-6 p-3">
      {/* Welcome Section */}
      <Card className="border-dashed bg-gradient-to-r from-blue-500/10 to-purple-500/10">
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
      <CommunityStats stats={stats} />
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
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                Community Highlights
              </CardTitle>
              <CardDescription>
                Recent achievements and community milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-dashed p-4 text-center">
                  <div className="mb-1 text-2xl font-bold text-blue-400">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Questions Answered Today
                  </div>
                </div>
                <div className="rounded-lg border border-dashed p-4 text-center">
                  <div className="mb-1 text-2xl font-bold text-green-400">
                    12
                  </div>
                  <div className="text-sm text-muted-foreground">
                    New Users This Week
                  </div>
                </div>
                <div className="rounded-lg border border-dashed p-4 text-center">
                  <div className="mb-1 text-2xl font-bold text-purple-400">
                    9
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Projects Completed This Week
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right Column - Activity Feed */}
        <div className="lg:col-span-1">
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}
