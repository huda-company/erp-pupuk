export interface SupplierDocument extends Document {
  email: string;
  supplierCode: string;
  company: string;
  managerName: string;
  managerSurname: string;
  bankAccount: string;
  RC: string;
  AI: string;
  NIF: string;
  NIS: string;
  address: string;
  tel: string;
  fax: string;
  cell: string;
  website: string;
  createdAt: Date;
  removed: boolean;
  enabled: boolean;
}
