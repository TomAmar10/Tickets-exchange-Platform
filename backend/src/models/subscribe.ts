import { Document, model, Schema } from "mongoose";

export interface ISubscribe {
  email: String;
}

export interface ISubscribeModel extends Document, ISubscribe {}

const SubscribeSchema: Schema = new Schema<ISubscribe>(
  {
    email: {
      type: String,
      required: [true, "Missing email"],
    },
  },
  {
    versionKey: false,
  }
);

export const SubscribeModel = model<ISubscribeModel>(
  "subscribes", // name of document collection
  SubscribeSchema
);
