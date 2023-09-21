import { getServerSession } from "next-auth";

import authOptions from "@/app/api/auth/[...nextauth]/authOpts";

const pageRedirection = async () => {
  let url = "auth/login";

  const session = await getServerSession(authOptions);

  if (session?.user && ["usr"].includes(String(session?.user.role.codeName)))
    url = "/user";
  if (
    session?.user &&
    ["adm-pemb", "adm-penj"].includes(String(session?.user.role.codeName))
  )
    url = "admin";

  return url;
};

export default pageRedirection;
