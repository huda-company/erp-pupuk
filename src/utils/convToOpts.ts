import { Option } from "@/components/Dropdown/types";

const convToOpts = (data: any, idProp: string, labelProp: string) => {
  return data.map((x: any) => {
    return {
      id: x[idProp],
      label: x[labelProp],
      metadata: x,
    } as Option;
  });
};

export default convToOpts;
