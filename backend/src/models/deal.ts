import { Document, model, Schema } from "mongoose";

export interface IDeal {
  tickets: Schema.Types.ObjectId[];
  id_seller: Schema.Types.ObjectId;
  id_buyer: Schema.Types.ObjectId;
  id_bid: Schema.Types.ObjectId;
  price: Number;
  deal_date: Date;
  is_seller_rated: boolean;
  is_buyer_rated: boolean;
}

export interface IDealModel extends Document, IDeal {}

const DealSchema: Schema = new Schema<IDeal>(
  {
    tickets: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "Missing ticket ID"],
        trim: true,
        ref: "tickets",
      },
    ],
    id_seller: {
      type: Schema.Types.ObjectId,
      required: [true, "Missing seller ID"],
      trim: true,
      ref: "users",
    },
    id_buyer: {
      type: Schema.Types.ObjectId,
      required: [true, "Missing buyer ID"],
      trim: true,
      ref: "users",
    },
    id_bid: {
      type: Schema.Types.ObjectId,
      required: [true, "Missing bid ID"],
      trim: true,
      ref: "bids",
    },
    price: {
      type: Number,
      required: [true, "Price required"],
    },
    deal_date: {
      type: Date,
      required: [true, "Missing deal date"],
      default: new Date(),
    },
    is_seller_rated: {
      type: Boolean,
      default: false,
    },
    is_buyer_rated: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

export const DealModel = model<IDealModel>(
  "deals", // name of document collection
  DealSchema
);
