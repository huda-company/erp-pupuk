export interface PaymentModeDocument extends Document {
  description: string;
  name: string;
  createdAt: Date;
  enabled: boolean;
  isDefault: boolean;
  removed: boolean;
  ref: string;
}
