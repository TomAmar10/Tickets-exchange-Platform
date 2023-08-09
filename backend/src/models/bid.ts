import { Document, model, Schema } from "mongoose";

export enum StatusBid {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  DECLINED = "DECLINED",
}

export interface IBid {
  id_bidder: Schema.Types.ObjectId;
  id_owner: Schema.Types.ObjectId;
  tickets: Schema.Types.ObjectId[];
  bid_date: Date;
  status: StatusBid;
  amount: Number;
}

export interface IBidModel extends Document, IBid {}

const BidSchema: Schema = new Schema<IBid>(
  {
    id_bidder: {
      type: Schema.Types.ObjectId,
      required: [true, "Missing bidder ID"],
      trim: true,
      ref: "users",
    },
    id_owner: {
      type: Schema.Types.ObjectId,
      required: [true, "Missing owner ID"],
      trim: true,
      ref: "users",
    },
    tickets: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "Missing ticket ID"],
        trim: true,
        ref: "tickets",
      },
    ],
    bid_date: {
      type: Date,
      required: [true, "Missing bid date"],
      default: new Date(),
    },
    status: {
      type: String,
      required: [false, "Missing status"],
      default: StatusBid.PENDING,
    },
    amount: {
      type: Number,
      required: [true, "Missing amount"],
    },
  },
  {
    versionKey: false,
  }
);

export const BidModel = model<IBidModel>(
  "bids", // name of document collection
  BidSchema
);

