import { Document, model, Schema } from "mongoose";

export interface IEvent {
  id_category: Schema.Types.ObjectId;
  location: string;
  date: Date;
  event_name: string;
  description: string;
  time_create: Date;
  image: Buffer | string;
  isApproved: boolean;
  tags: string[];
}

export interface IEventModel extends Document, IEvent {}

const EventSchema: Schema = new Schema<IEvent>(
  {
    id_category: {
      type: Schema.Types.ObjectId,
      required: [true, "Missing category ID"],
      trim: true,
      ref: "categories",
    },
    location: {
      type: String,
      required: [true, "Missing location"],
      minLength: [2, "Location too short"],
      maxLength: [40, "Location too long"],
    },
    date: {
      type: Date,
      required: [true, "Missing date"],
    },
    event_name: {
      type: String,
      required: [true, "Missing event name"],
      minLength: [2, "Event name too short"],
      maxLength: [40, "Event name too long"],
    },
    description: {
      type: String,
      required: [true, "Missing description"],
      minLength: [2, "Description too short"],
      maxLength: [70, "Description too long"],
    },
    time_create: {
      type: Date,
      required: [true, "Missing creation time"],
      default: new Date(),
    },
    image: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const EventModel = model<IEventModel>(
  "events", // name of document collection
  EventSchema
);
