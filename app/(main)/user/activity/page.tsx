import { nextAuthOptions } from "@/auth";
import { UserType } from "@/generated/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getServerSession(nextAuthOptions);
  if (session?.user?.type === UserType.RECRUITER) {
    redirect("/user/activity/jobs");
  } else if (session?.user?.type === UserType.DEVELOPER) {
    redirect("/user/activity/questions");
  }
}
export default Page;
