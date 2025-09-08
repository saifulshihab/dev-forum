import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

async function Page() {
  const users = await prisma.user.findMany();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900 p-4 shadow-sm transition hover:shadow-md"
        >
          <Image
            width={48}
            height={48}
            alt={user.fullName}
            src={user.dpUrl || ""}
            className="rounded-full"
          />
          <div>
            <Link href={`/users/${user.id}`} className="hover:text-primary">
              <div className="text-sm font-semibold">{user.fullName}</div>
            </Link>
            <div className="text-xs text-zinc-500">
              {user.bio || user.email}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Page;
