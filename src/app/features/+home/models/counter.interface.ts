import { Indication } from './indication.interface';

export interface ICounter{
  id?: string;
  type?: string;
  userId?: string;
  image?: string;
  indications?: Indication[];
}
