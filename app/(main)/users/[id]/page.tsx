import { Button } from "@/components/ui/button";
import UserProfile from "@/components/user/profile";
import { getUser } from "@/lib/actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

async function Page(props: Props) {
  const userId = (await props.params).id;
  const user = await getUser(userId, true);
  if (!user) notFound();
  return (
    <div className="space-y-3">
      <Button
        asChild
        variant="link"
        className="px-0 text-muted-foreground hover:no-underline"
      >
        <Link href="/users">
          <ArrowLeft className="mr-1" />
          Back
        </Link>
      </Button>
      <UserProfile user={user} />
    </div>
  );
}

export default Page;
