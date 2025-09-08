import UserProfile from "@/components/user/profile";
import { getCurrentUser } from "@/lib/actions";
import { notFound } from "next/navigation";

async function Page() {
  const user = await getCurrentUser(true);
  if (!user) notFound();
  return <UserProfile user={user} currentUser />;
}

export default Page;
