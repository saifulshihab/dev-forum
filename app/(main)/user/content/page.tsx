import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserQuestions from "@/components/user/content/questions";

function Page() {
  return (
    <div>
      <div className="flex h-[3.125rem] items-center border-b border-dashed px-4">
        <h1 className="text-2xl font-semibold leading-none">Manage Content</h1>
      </div>
      <div className="h-[calc(100vh-3.125rem)] overflow-y-auto p-3">
        <Tabs defaultValue="questions">
          <TabsList>
            <TabsTrigger value="questions">My Questions</TabsTrigger>
            <TabsTrigger value="blogs">Others</TabsTrigger>
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
