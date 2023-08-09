import { createSlice } from "@reduxjs/toolkit";
import { Ticket } from "../models/Ticket";
import { Event } from "../models/Event";

export interface UserEventTickets extends Event {
  ticketsArray: Ticket[];
}

export interface UserTicketsState {
  allTickets: Ticket[] | null;
  allTicketsByEvents: UserEventTickets[] | null;
  ticketsForSale: Ticket[] | null;
  ticketsForSaleByEvents: UserEventTickets[] | null;
}

const initialUserTicketsState: UserTicketsState = {
  allTickets: null,
  allTicketsByEvents: null,
  ticketsForSale: null,
  ticketsForSaleByEvents: null,
};

// Returns an array of Events, which every event also has a ticketsArray field. (UserEventTickets[])
export function ticketsToEvents(tickets: Ticket[]): UserEventTickets[] {
  const eventsObj: Record<string, UserEventTickets> = {};
  tickets.forEach((ticket) => {
    const eventId = (ticket.id_event as Event)._id as string;
    if (!eventsObj[eventId]) {
      eventsObj[eventId] = {
        ...(ticket.id_event as Event),
        ticketsArray: [ticket],
      };
    } else {
      const firstTicketArea = eventsObj[eventId].ticketsArray[0].area;
      // if the eventId is the same, and there is no event.ticketsArray[0].area that matches the ticket.area, create new object.
      if (firstTicketArea !== ticket.area) {
        const newEventId = eventId + "_new";
        eventsObj[newEventId] = {
          ...(ticket.id_event as Event),
          ticketsArray: [ticket],
        };
      } else eventsObj[eventId].ticketsArray.push(ticket);
    }
  });
  const eventsArray: UserEventTickets[] = Object.keys(eventsObj).map(
    (eventId) => eventsObj[eventId]
  );
  return eventsArray.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

const userTicketsSlice = createSlice({
  name: "userTickets",
  initialState: initialUserTicketsState,
  reducers: {
    setTickets(state, action) {
      const tickets = action.payload || [];
      state.allTickets = tickets;
      state.allTicketsByEvents = ticketsToEvents(tickets);
      const forSale = tickets.filter((t: Ticket) => t.open_for_sale);
      state.ticketsForSale = forSale;
      state.ticketsForSaleByEvents = ticketsToEvents(forSale);
    },
    addTickets(state, action) {
      const newTickets: Ticket[] = [
        ...action.payload,
        ...(state.allTickets as Ticket[]),
      ];
      state.allTickets = newTickets;
      state.allTicketsByEvents = ticketsToEvents(newTickets);
      const forSale = newTickets.filter((t: Ticket) => t.open_for_sale);
      state.ticketsForSale = forSale;
      state.ticketsForSaleByEvents = ticketsToEvents(forSale);
    },
    cancelTicketList(state, action) {
      const ticket: Ticket = action.payload;
      const tickets = state.allTickets;
      const newTickets = tickets?.map((t) => {
        if (t._id === ticket._id) t.open_for_sale = false;
        return t;
      });
      state.allTickets = newTickets || null;
      state.allTicketsByEvents = ticketsToEvents(newTickets || []);
      const forSale = state.ticketsForSale?.filter((t) => t._id !== ticket._id);
      state.ticketsForSale = forSale || null;
      if (!forSale) {
        state.ticketsForSaleByEvents = null;
        return;
      }
      state.ticketsForSaleByEvents = ticketsToEvents(forSale);
    },
  },
});

export const userTicketsActions = userTicketsSlice.actions;
export default userTicketsSlice.reducer;
