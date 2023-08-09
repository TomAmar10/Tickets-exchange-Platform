import { Document, model, Schema } from "mongoose";

export interface ICategory {
  name: String;
  hebrew: String;
  image: Buffer | string;
}

export interface ICategoryModel extends Document, ICategory {}

const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Missing category name"],
      minLength: [2, "Category name too short"],
      maxLength: [20, "Category name too long"],
    },
    hebrew: {
      type: String,
      required: [true, "Missing category name"],
      minLength: [2, "Category name too short"],
      maxLength: [20, "Category name too long"],
    },
    image: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

export const CategoryModel = model<ICategoryModel>(
  "categories", // name of document collection
  CategorySchema
);
