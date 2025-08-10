import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  Eye,
  MessageCircle,
  ThumbsUp,
  TrendingUp,
  UserPlus
} from "lucide-react";

type ActivityItem = {
  id: string;
  type: "question" | "answer" | "user" | "trending";
  title: string;
  description?: string;
  user?: string;
  stats?: {
    views?: number;
    answers?: number;
    upvotes?: number;
  };
  tags?: string[];
};

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "question":
        return <MessageCircle className="h-4 w-4 text-blue-400" />;
      case "answer":
        return <ThumbsUp className="h-4 w-4 text-green-400" />;
      case "user":
        return <UserPlus className="h-4 w-4 text-purple-400" />;
      case "trending":
        return <TrendingUp className="h-4 w-4 text-orange-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getActivityColor = (type: ActivityItem["type"]) => {
    switch (type) {
      case "question":
        return "border-blue-500/20 bg-blue-500/10";
      case "answer":
        return "border-green-500/20 bg-green-500/10";
      case "user":
        return "border-purple-500/20 bg-purple-500/10";
      case "trending":
        return "border-orange-500/20 bg-orange-500/10";
      default:
        return "border-gray-500/20 bg-gray-500/10";
    }
  };

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5" />
          Community Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">
            <Clock className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50 ${getActivityColor(activity.type)}`}
            >
              <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <p className="truncate text-sm font-medium">
                    {activity.title}
                  </p>
                  {activity.type === "trending" && (
                    <Badge variant="secondary" className="text-xs">
                      Trending
                    </Badge>
                  )}
                </div>
                {activity.description && (
                  <p className="line-clamp-2 text-xs text-muted-foreground">
                    {activity.description}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {activity.user && (
                      <span className="flex items-center gap-1">
                        <UserPlus className="h-3 w-3" />
                        {activity.user}
                      </span>
                    )}
                    {activity.stats && (
                      <>
                        {activity.stats.views && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {activity.stats.views}
                          </span>
                        )}
                        {activity.stats.answers && (
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3" />
                            {activity.stats.answers}
                          </span>
                        )}
                        {activity.stats.upvotes && (
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            {activity.stats.upvotes}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {activity.tags && activity.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {activity.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
