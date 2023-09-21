export interface RoleDocument extends Document {
  codeName: string;
  displayName: string;
  created: Date;
  removed: boolean;
}
