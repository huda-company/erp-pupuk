export interface ItemCategoryDocument extends Document {
  name: string;
  description: string;
  removed: boolean;
  enabled: boolean;
}
