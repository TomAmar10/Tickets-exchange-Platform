import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./authSlice";
import eventsReducer, { EventState } from "./eventSlice";
import userTicketsReducer, { UserTicketsState } from "./userTicketsSlice";
import userBidsReducer, { UserBidsState } from "./userBidsSlice";
import categoriesReducer, { CategoryState } from "./categorySlice";
import languageReducer, { LanguageState } from "./languageSlice";

export interface IStore {
  user: UserState;
  events: EventState;
  userTickets: UserTicketsState;
  userBids: UserBidsState;
  categories: CategoryState;
  language: LanguageState;
}

const store = configureStore({
  reducer: {
    user: userReducer,
    events: eventsReducer,
    userTickets: userTicketsReducer,
    userBids: userBidsReducer,
    categories: categoriesReducer,
    language: languageReducer,
  },
});

export default store;
