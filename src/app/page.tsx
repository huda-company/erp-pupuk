import { redirect } from "next/navigation";

import pageRedirection from "@/utils/pageRedirection";

export default async function Home() {
  const url = await pageRedirection();
  redirect(url);
}
