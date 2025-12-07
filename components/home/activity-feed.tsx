import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Answer, Question, User } from "@/generated/prisma";
import {
  Clock,
  MessageCircleQuestionMark,
  ThumbsUp,
  TrendingUp,
  UserPlus
} from "lucide-react";

interface ActivityFeedProps {
  activities: {
    latestQuestion: Question | null;
    greatAnswer: Answer | null;
    newMember: User | null;
  };
}

export default async function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="border-dashed">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5" />
          Community Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {!Object.entries(activities).length ? (
          <div className="py-4 text-center text-muted-foreground">
            <Clock className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        ) : (
          <>
            {activities.latestQuestion ? (
              <div className="flex items-start gap-3 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3 transition-colors hover:bg-muted/50">
                <div className="mt-0.5">
                  <MessageCircleQuestionMark className="h-4 w-4 text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="truncate text-sm font-medium">
                      Latest question
                    </p>
                  </div>
                  {activities.latestQuestion.content && (
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {activities.latestQuestion.title}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground"></div>
                  </div>
                  {activities.latestQuestion.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {activities.latestQuestion.tags
                        .slice(0, 3)
                        .map((tag, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            {activities.greatAnswer ? (
              <div className="flex items-start gap-3 rounded-lg border border-green-500/20 bg-green-500/10 p-3 transition-colors hover:bg-muted/50">
                <div className="mt-0.5">
                  <ThumbsUp className="h-4 w-4 text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="truncate text-sm font-medium">
                      Great answer on{" "}
                      {(activities.greatAnswer as any)?.question?.title}
                    </p>
                  </div>
                  {activities.greatAnswer.content && (
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {activities.greatAnswer.content}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {activities.greatAnswer.likeCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {activities.newMember ? (
              <div className="flex items-start gap-3 rounded-lg border border-purple-500/20 bg-purple-500/10 p-3 transition-colors hover:bg-muted/50">
                <div className="mt-0.5">
                  <UserPlus className="h-4 w-4 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="truncate text-sm font-medium">
                      New member joined: {activities.newMember.fullName}
                    </p>
                  </div>
                  {activities.newMember.bio && (
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {activities.newMember.bio}
                    </p>
                  )}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <UserPlus className="h-3 w-3" />
                        {activities.newMember.fullName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
}
