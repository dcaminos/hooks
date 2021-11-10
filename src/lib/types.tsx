import { ValidateStatus } from "antd/lib/form/FormItem";

export type FormItemState = {
  value: string;
  isValid: ValidateStatus;
  help: string;
};
