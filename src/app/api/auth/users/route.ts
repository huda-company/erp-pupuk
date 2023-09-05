import startDb from "@/lib/db";
import UserModel from "@/models/UserModel";
import { NextResponse } from "next/server";

interface NewUserReq {
  name: string;
  email: string;
  password: string;
}

interface NewUserRes {
  id: string;
  name: string;
  email: string;
  role: string;
}

type NewResponse = NextResponse<{ user?: NewUserRes; error?: string }>;

export const POST = async (req: Request): Promise<NewResponse> => {
  const body = (await req.json()) as NewUserReq;
  await startDb();

  const oldUser = await UserModel.findOne({ email: body.email });
  if (oldUser) {
    return NextResponse.json(
      { error: "email already in use" },
      { status: 422 }
    );
  }

  const newBody = {
    ...body,
    surname: body.name,
  };

  const user = await UserModel.create(newBody);
  return NextResponse.json({
    user: {
      id: String(user._id),
      email: user.email,
      name: user.name,
      surname: user.name,
      role: user.role,
    },
  });
};
