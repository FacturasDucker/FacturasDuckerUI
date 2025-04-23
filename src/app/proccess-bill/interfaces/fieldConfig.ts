import { BasicUserInfo } from "./basicUserInfo";

// Interface for form field configuration based on BasicUserInfo
export interface FieldConfig {
 name: keyof BasicUserInfo;  // Property name from BasicUserInfo interface
 label: string;              // Display label for the field
 type: string;               // Input type (e.g., 'text', 'email')
 placeholder?: string;       // Optional placeholder text
}
