import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";
import TextEditor from "@/components/ui/text-editor";
import { Textarea } from "@/components/ui/textarea";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="flex h-full w-full flex-col gap-4">
        <h2 className="text-xl font-bold">Ask your question</h2>
        <form
          action={async () => {
            "use server";
            return;
          }}
          className="flex flex-col gap-4"
        >
          <Label htmlFor="title">Title</Label>
          <Textarea id="title" placeholder="Enter question title" />
          <Label>Description</Label>
          <TextEditor />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Suspense>
  );
}

export default Page;
