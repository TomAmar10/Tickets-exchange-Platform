import { createSlice } from "@reduxjs/toolkit";
import { Ticket } from "../models/Ticket";
import { Bid } from "../models/Bid";
import filterTickets from "../utils/ticketsFilter";
import { User } from "../models/User";
import { StatusBid } from "../models/Bid";

export interface UserBidsState {
  allOffers: Bid[] | null;
  offersReceived: Bid[] | null;
  offersSent: Bid[] | null;
  confirmedOffersReceived: Bid[] | null;
  confirmedOffersSent: Bid[] | null;
  declinedOffersReceived: Bid[] | null;
  declinedOffersSent: Bid[] | null;
}

const initialUserBidsState: UserBidsState = {
  allOffers: null,
  offersReceived: null,
  offersSent: null,
  confirmedOffersReceived: null,
  confirmedOffersSent: null,
  declinedOffersReceived: null,
  declinedOffersSent: null,
};

const userBidsSlice = createSlice({
  name: "userBids",
  initialState: initialUserBidsState,
  reducers: {
    setBids(state, action) {
      if (!action.payload.bids) {
        state.allOffers = null;
        state.offersReceived = null;
        state.offersSent = null;
        state.confirmedOffersReceived = null;
        state.confirmedOffersSent = null;
        state.declinedOffersReceived = null;
        state.declinedOffersSent = null;
        return;
      }
      state.allOffers = action.payload.bids;
      const received: Bid[] = [];
      const sent: Bid[] = [];
      const confirmedReceived: Bid[] = [];
      const confirmedSent: Bid[] = [];
      const declinedReceived: Bid[] = [];
      const declinedSent: Bid[] = [];
      action.payload.bids.forEach((b: Bid) => {
        b.tickets = filterTickets(b.tickets as Ticket[]);
        if (b.status === StatusBid.CONFIRMED) {
          (b.id_bidder as User)._id === action.payload.id
            ? confirmedSent.push(b)
            : confirmedReceived.push(b);
        }
        if (b.status === StatusBid.DECLINED) {
          (b.id_bidder as User)._id === action.payload.id
            ? declinedSent.push(b)
            : declinedReceived.push(b);
        }
        if (b.status === StatusBid.PENDING) {
          (b.id_bidder as User)._id === action.payload.id
            ? sent.push(b)
            : received.push(b);
        }
      });
      console.log(confirmedReceived);
      console.log(confirmedSent);
      state.offersReceived = received;
      state.offersSent = sent;
      state.confirmedOffersReceived = confirmedReceived;
      state.confirmedOffersSent = confirmedSent;
      state.declinedOffersReceived = declinedReceived;
      state.declinedOffersSent = declinedSent;
    },
    addNewBid(state, action) {
      const bid = action.payload;
      bid.tickets = filterTickets(bid.tickets as Ticket[]);
      const newSentOffers = state.offersSent || [];
      newSentOffers?.push(bid);
      state.offersSent = newSentOffers;
    },
    confirmBid(state, action) {
      const bidToConfirm: Bid = action.payload;
      const confirmedOffers = [
        ...(state.confirmedOffersReceived as Bid[]),
        bidToConfirm,
      ];
      state.confirmedOffersReceived = confirmedOffers;
      const received = [
        ...(state.offersReceived as Bid[]).filter(
          (b) => b._id !== bidToConfirm._id
        ),
      ];
      state.offersReceived = received;
    },
    declineBid(state, action) {
      const bidToDecline: Bid = action.payload;
      const offersDeclined = [
        ...(state.declinedOffersReceived as Bid[]),
        bidToDecline,
      ];
      state.declinedOffersReceived = offersDeclined;
      const received = [
        ...(state.offersReceived as Bid[]).filter(
          (b) => b._id !== bidToDecline._id
        ),
      ];
      state.offersReceived = received;
    },
    cancelBid(state, action) {
      const bidToCancel: Bid = action.payload;
      const sentOffers = [
        ...(state.offersSent as Bid[]).filter((b) => b._id !== bidToCancel._id),
      ];
      state.offersSent = sentOffers;
    },
  },
});

export const userBidsActions = userBidsSlice.actions;
export default userBidsSlice.reducer;
