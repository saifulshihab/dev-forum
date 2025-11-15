"use client";

import { useAuth } from "@/components/contexts/auth-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserQuestions from "@/components/user/content/questions";
import { UserType } from "@/generated/prisma";

function Page({ searchParams }: { searchParams: { tab?: string } }) {
  const { user } = useAuth();
  const defaultTab =
    searchParams.tab || user?.type === UserType.DEVELOPER
      ? "questions"
      : user?.type === UserType.RECRUITER
        ? "projects"
        : undefined;
  return (
    <div>
      <div className="flex h-[3.125rem] items-center border-b border-dashed px-4">
        <h1 className="text-2xl font-semibold leading-none">Manage Content</h1>
      </div>
      <div className="h-[calc(100vh-3.125rem)] overflow-y-auto p-3">
        <Tabs defaultValue={defaultTab}>
          <TabsList>
            {user?.type === UserType.DEVELOPER ? (
              <>
                <TabsTrigger value="questions">My Questions</TabsTrigger>
                <TabsTrigger value="jobs">My Jobs</TabsTrigger>
                <TabsTrigger value="projects">My Projects</TabsTrigger>
              </>
            ) : user?.type === UserType.RECRUITER ? (
              <>
                <TabsTrigger value="jobs">My Jobs</TabsTrigger>
                <TabsTrigger value="projects">My Projects</TabsTrigger>
              </>
            ) : null}
          </TabsList>
          <TabsContent value="questions">
            <UserQuestions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Page;
