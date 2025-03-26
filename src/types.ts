type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox";

interface BaseField {
  name: string;
  type: FieldType;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  validation?: (value: any) => string | boolean;
  placeholder?: string;
}

interface TextField extends BaseField {
  type: "text" | "email" | "password" | "number";
  placeholder?: string;
}

interface TextareaField extends BaseField {
  type: "textarea";
  placeholder?: string;
  rows?: number;
}

interface SelectField extends BaseField {
  type: "select";
  options: Array<{ value: string | number; label: string }>;
}

interface CheckboxField extends BaseField {
  type: "checkbox";
}

export type FormField = TextField | TextareaField | SelectField | CheckboxField;

export interface FormData {
  [key: string]: any;
  username?: string;
  email?: string;
  password?: string;
  agree?: boolean;
}
