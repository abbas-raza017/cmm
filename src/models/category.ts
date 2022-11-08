import { Attribute } from "./attribute";

export interface Category {
  id: string;
  title: string;
  attributes: Attribute[];
};
