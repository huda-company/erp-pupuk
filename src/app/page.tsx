import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import authOptions from "./api/auth/[...nextauth]/authOpts";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("auth/login");

  if (session?.user && String(session?.user.role) == "user") redirect("/user");
  if (session?.user && String(session?.user.role) == "admin")
    redirect("/admin");

  return <>undefined</>;
}
