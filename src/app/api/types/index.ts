export type StandardResp = {
  success: boolean;
  result: any;
  message?: string;
  error?: any;
};

export const initStandardResp: StandardResp = {
  success: false,
  result: null,
};
