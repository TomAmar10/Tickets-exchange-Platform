import { createSlice } from "@reduxjs/toolkit";
import { Event } from "../models/Event";

export interface EventState {
  events: Event[] | null;
  currentEvent: Event | null;
  isCreatingEvent: boolean;
  isLoading: boolean;
}

const initialEventState: EventState = {
  events: null,
  currentEvent: null,
  isCreatingEvent: false,
  isLoading: false,
};

const eventSlice = createSlice({
  name: "events",
  initialState: initialEventState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    setSingleEvent(state, action) {
      const currEvent: Event = action.payload;
      state.currentEvent = currEvent;
    },
    clearSingleEvent(state) {
      state.currentEvent = null;
    },
    startCreating(state) {
      state.isCreatingEvent = true;
    },
    endCreating(state) {
      state.isCreatingEvent = false;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    finishLoading(state) {
      state.isLoading = false;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
