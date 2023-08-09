import { Bid } from "./Bid";
import { Ticket } from "./Ticket";
import { User } from "./User";

export interface Deal {
  _id?: string;
  tickets: Ticket[] | string[];
  id_seller: string | User;
  id_buyer: string | User;
  id_bid: string | Bid;
  price: number;
  deal_date?: Date | undefined;
  is_seller_rated?: boolean;
  is_buyer_rated?: boolean;
}
