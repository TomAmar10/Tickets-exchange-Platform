import { Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import ErrorModel from "./error";
import jwt from "jsonwebtoken";

export enum Role {
  ADMIN = 1,
  COSTUMER = 2,
}

export interface Rating {
  _id: Schema.Types.ObjectId;
  star: number;
  comment: string;
  id_posted: Schema.Types.ObjectId;
  time_create: Date;
}

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  birth_date: Date;
  time_create: Date;
  image: Buffer | string;
  ratings: Rating[];
  total_rating: String;
  role: Role;
  favorites: Schema.Types.ObjectId[];
}

export interface IUserModel extends Document, IUser {}

const UserSchema: Schema = new Schema<IUser>(
  {
    first_name: {
      type: String,
      required: [true, "Missing name"],
      minLength: [2, "Name too short"],
      maxLength: [20, "Name too long"],
    },
    last_name: {
      type: String,
      required: [true, "Missing last name"],
      minLength: [2, "Last name too short"],
      maxLength: [20, "Last name too long"],
    },
    email: {
      type: String,
      required: [true, "Missing email"],
      minLength: [6, "Email too short"],
      maxLength: [50, "Email too long"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Missing password"],
      minLength: [6, "Password too short"],
      maxLength: [200, "Password too long"],
    },
    phone: {
      type: String,
      required: [true, "Missing phone number"],
      minLength: [8, "Phone number too short"],
      maxLength: [12, "Phone number too long"],
      default: "050000000",
    },
    time_create: {
      type: Date,
      required: [true, "Missing creation time"],
      default: new Date(),
    },
    birth_date: Date,
    image: {
      type: String,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        id_posted: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        time_create: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    total_rating: {
      type: String,
      default: 0,
    },
    role: {
      type: Number,
      required: [true, "Missing role"],
      default: 2,
      min: 1,
      max: 2,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: "events",
      },
    ],
  },
  {
    versionKey: false,
  }
);

// Hashing password
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user && user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

export const UserModel = model<IUserModel>(
  "users", // name of document collection
  UserSchema
);
