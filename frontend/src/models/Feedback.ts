import { User } from "./User";

export interface Feedback {
  _id?: string;
  star: string;
  comment: string;
  id_posted: string | User;
  time_create: Date | string;
}
