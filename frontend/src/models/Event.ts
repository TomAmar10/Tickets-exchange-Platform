import { Category } from "./Category";

export interface Event {
  _id: string | undefined;
  id_category: Category;
  location: string;
  date: Date | string;
  event_name: string;
  description: string;
  time_create: Date | undefined;
  image?: string;
  isApproved: boolean;
  tags: string[];
}
