import { FieldType } from "./attribute";
import { Category } from "./category";

export interface Machine {
  id: string;
  categoryId: string;
  fields?: Field[];
};

export interface Field{
  id: string;
  value: string;
};
