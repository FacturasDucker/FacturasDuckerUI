import { BasicUserInfo } from "./basicUserInfo";

export interface FieldConfig {
  name: keyof BasicUserInfo;
  label: string;
  type: string;
  placeholder?: string;
}
