export interface Attribute {
  id: string;
  name: string;
  type: FieldType;
  isTitle: boolean;
};

export enum FieldType {
  Date = 'Date',
  Text = 'Text',
  Checkbox = 'Checkbox',
  Number = 'Number'
};
