export interface CashflowCatDocument extends Document {
  type: string;
  name: string;
  description: string;
  removed: boolean;
}
