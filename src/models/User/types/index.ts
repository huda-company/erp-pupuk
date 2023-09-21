import { Types } from "mongoose";

export interface UserDocument extends Document {
  email: string;
  name: string;
  surname: string;
  photo: string;
  createdAt: Date;
  hasCustomPermissions: boolean;
  isLoggedIn: number;
  loggedSessions: string[];
  password: string;
  role: Types.ObjectId;
  removed: boolean;
  enabled: boolean;
}
