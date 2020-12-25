export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  label: string;
  name: string;
  inputType?: string;
  type: string;
  hidden: boolean;

  options?: string[];
  // collections?: any;
  value?: any;
  validations?: Validator[];
  selectBindLabel?: string;
  selectBindValue?: string;
  selectTemplate?: string;
  selectDataUrl?: string;
  selectedItem?: any;
}
