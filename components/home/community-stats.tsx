import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTagColor, sleep } from "@/lib/utils";
import {
  Briefcase,
  Layers,
  MessageCircle,
  MessageCircleQuestionMark,
  TrendingUp,
  Users
} from "lucide-react";

interface CommunityStatsProps {
  stats: {
    totalUsers: number | undefined;
    totalQuestions: number | undefined;
    totalAnswers: number | undefined;
    jobsPosted: number | undefined;
    freelanceProjects: number | undefined;
    trendingTopics: string[] | undefined;
  };
}

export default async function CommunityStats({ stats }: CommunityStatsProps) {
  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers?.toLocaleString(),
      icon: <Users className="h-4 w-4 text-blue-400" />,
      color: "border-blue-500/20 bg-blue-500/10"
    },
    {
      title: "Questions",
      value: stats?.totalQuestions?.toLocaleString(),
      icon: <MessageCircleQuestionMark className="h-4 w-4 text-green-400" />,
      color: "border-green-500/20 bg-green-500/10"
    },
    {
      title: "Answers",
      value: stats?.totalAnswers?.toLocaleString(),
      icon: <MessageCircle className="h-4 w-4 text-purple-400" />,
      color: "border-purple-500/20 bg-purple-500/10"
    },
    {
      title: "Jobs Posted",
      value: stats?.jobsPosted?.toLocaleString(),
      icon: <Briefcase className="h-4 w-4 text-orange-400" />,
      color: "border-orange-500/20 bg-orange-500/10"
    },
    {
      title: "Freelance Projects",
      value: stats?.freelanceProjects?.toLocaleString(),
      icon: <Layers className="h-4 w-4 text-teal-400" />,
      color: "border-teal-500/20 bg-teal-500/10"
    }
  ];
  await sleep(5000);
  return (
    <div className="space-y-4">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {statCards.map((stat, index) => (
          <Card key={index} className={`border-dashed ${stat.color}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full bg-background/50 p-2">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Trending Topics */}
      {stats?.trendingTopics && stats.trendingTopics.length > 0 && (
        <Card className="border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stats.trendingTopics.map((topic, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`text-xs ${getTagColor(index)}`}
                >
                  #{topic}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
