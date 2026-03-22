import { nextAuthOptions } from "@/auth";
import DeveloperUserJobs from "@/components/user/activity/developer-jobs";
import RecruiterUserJobs from "@/components/user/activity/recruiter-jobs";
import { UserType } from "@/generated/prisma";
import { getServerSession } from "next-auth";

async function Page() {
  const session = await getServerSession(nextAuthOptions);
  if (session?.user?.type === UserType.RECRUITER) return <RecruiterUserJobs />;
  if (session?.user?.type === UserType.DEVELOPER) return <DeveloperUserJobs />;
}

export default Page;
