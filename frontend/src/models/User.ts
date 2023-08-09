import { Feedback } from "./Feedback";

export interface User {
  _id: string | undefined;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  time_create: Date | undefined;
  role: Role;
  token: string | undefined;
  refreshToken: string | undefined;
  image?: string;
  ratings: Feedback[];
  total_rating: string;
  favorites: string[];
}

export enum Role {
  ADMIN = 1,
  COSTUMER = 2,
}
