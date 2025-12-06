import { nextAuthOptions } from "@/auth";
import UserQuestions from "@/components/user/activity/questions";
import { UserType } from "@/generated/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getServerSession(nextAuthOptions);
  if (session?.user?.type === UserType.RECRUITER) {
    redirect("/user/activity/jobs");
  }
  return <UserQuestions />;
}

export default Page;
