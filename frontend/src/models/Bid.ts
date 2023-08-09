import { EventTicket, Ticket } from "./Ticket";
import { User } from "./User";

export interface Bid {
  _id?: string;
  tickets: Ticket[] | string[] | EventTicket[];
  id_bidder: string | User;
  id_owner: string | User;
  bid_date?: Date | string;
  amount: number;
  status: StatusBid;
}

export enum StatusBid {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  DECLINED = "DECLINED",
}
