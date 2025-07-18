"use client";

import { useSession } from "next-auth/react";

function Page() {
  const { data } = useSession();
  console.log("FE", data?.user);
  return (
    <div>
      <div className="">
        <div className="">{/* <Image src={user.}  /> */}</div>
      </div>
    </div>
  );
}

export default Page;
