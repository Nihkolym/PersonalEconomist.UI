import { ICreditCard } from './credit-card.interface';
import { Item } from './item.interface';

export interface ITransaction {
  id?: string;
  creditCardId?: string;
  amount?: number;
  date?: Date;
  creditCard?: ICreditCard;
  items?: Item[];
}
