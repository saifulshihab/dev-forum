import { sleep } from "@/lib/utils";
import { Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";

async function CommunityHighlights() {
  await sleep(5000);
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
            <div className="mb-1 text-2xl font-bold text-blue-400">50+</div>
            <div className="text-sm text-muted-foreground">
              Questions Answered Today
            </div>
          </div>
          <div className="rounded-lg border border-dashed p-4 text-center">
            <div className="mb-1 text-2xl font-bold text-green-400">12</div>
            <div className="text-sm text-muted-foreground">
              New Users This Week
            </div>
          </div>
          <div className="rounded-lg border border-dashed p-4 text-center">
            <div className="mb-1 text-2xl font-bold text-purple-400">9</div>
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
