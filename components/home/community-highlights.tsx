import { getCommunityHighlights } from "@/lib/actions";
import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";

async function CommunityHighlights() {
  const highlights = await getCommunityHighlights();
  return (
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
              {highlights?.questionsAnsweredToday !== undefined
                ? highlights?.questionsAnsweredToday > 1
                  ? `${highlights?.questionsAnsweredToday - 1}+`
                  : highlights?.questionsAnsweredToday
                : 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Questions Answered Today
            </div>
          </div>
          <div className="rounded-lg border border-dashed p-4 text-center">
            <div className="mb-1 text-2xl font-bold text-green-400">
              {highlights?.usersJoinedThisWeek !== undefined
                ? highlights?.usersJoinedThisWeek
                : 0}
            </div>
            <div className="text-sm text-muted-foreground">
              New Users This Week
            </div>
          </div>
          <div className="rounded-lg border border-dashed p-4 text-center">
            <div className="mb-1 text-2xl font-bold text-purple-400">
              {" "}
              {highlights?.projectsCompletedThisWeek !== undefined
                ? highlights?.projectsCompletedThisWeek === 0
                  ? 0
                  : `${highlights?.projectsCompletedThisWeek - 1}+`
                : 0}
            </div>
            <div className="text-sm text-muted-foreground">
              Projects Completed This Week
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CommunityHighlights;
