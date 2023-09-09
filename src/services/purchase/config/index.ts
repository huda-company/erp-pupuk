import { base_url } from "@/constants/env";

import { MODULE_NAME } from "@/app/(admin_route)/admin/purchase/config";

export const PURCHASE_API_URL = {
  LIST: `${base_url}/api/${MODULE_NAME}/list`,
  CREATE: `${base_url}/api/${MODULE_NAME}`,
  UPDATE: `${base_url}/api/${MODULE_NAME}/edit`,
  DELETE: `${base_url}/api/${MODULE_NAME}/delete`,
  SHOW: `${base_url}/api/${MODULE_NAME}/read`,
};
