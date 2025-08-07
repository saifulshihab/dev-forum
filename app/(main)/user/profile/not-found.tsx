import { UserX } from "lucide-react";

function Page() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-8">
      <div className="mx-auto max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <UserX className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Profile Not Found
          </h1>
          <p className="text-muted-foreground">
            The profile you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
