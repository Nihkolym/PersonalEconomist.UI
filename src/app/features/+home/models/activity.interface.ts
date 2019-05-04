import { Item } from './item.interface';
export interface IActivity{
  id?: string;
  title?: string;
  image?: string;
  items?: Item[];
}
