import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user";
import dotenv from "dotenv";
import ErrorModel from "../models/error";
import { DealModel } from "../models/deal";
import jwtHelper from "../utils/jwt-helper";
dotenv.config();

const addRating = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id_user_to_rate = request.params.id_user_to_rate;
  const rating = request.body;
  const { star, id_posted, id_deal, comment, is_seller } = rating;
  try {
    await UserModel.findByIdAndUpdate(id_user_to_rate, {
      $push: {
        ratings: {
          star,
          id_posted,
          comment,
        },
      },
    });

    await DealModel.findByIdAndUpdate(
      id_deal,
      is_seller
        ? { $set: { is_seller_rated: true } }
        : { $set: { is_buyer_rated: true } }
    );

    const getAllRatings = await UserModel.findById(id_user_to_rate);
    const ratingsAmount = getAllRatings.ratings.length;
    const ratingSum = getAllRatings.ratings
      .map((r) => r.star)
      .reduce((prev, curr) => prev + curr, 0);
    const total_rating = Math.round(ratingSum / ratingsAmount);
    const ratedUser = await UserModel.findByIdAndUpdate(id_user_to_rate, {
      total_rating,
    });
    ratedUser.password = "";
    response.status(201).json(ratedUser);
  } catch (err) {
    next(err);
  }
};

const addFavoriteEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id_user = request.params.id_user;
  const id_event = request.body.id_event;
  try {
    await UserModel.findByIdAndUpdate(id_user, {
      $push: {
        favorites: id_event,
      },
    });
    const user = await UserModel.findById(id_user);
    if (!user) throw new ErrorModel(404, "User not found");
    const { image, password, ...userToToken } = user.toObject();
    response.status(201).json(userToToken);
  } catch (err) {
    next(err);
  }
};

const removeFavoriteEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id_user = request.params.id_user;
  const id_event = request.body.id_event;
  try {
    await UserModel.findByIdAndUpdate(id_user, {
      $pull: {
        favorites: id_event,
      },
    });
    const user = await UserModel.findById(id_user);
    if (!user) throw new ErrorModel(404, "User not found");
    const { image, password, ...userToToken } = user.toObject();
    response.status(201).json(userToToken);
  } catch (err) {
    next(err);
  }
};

const getUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.userId;
  return UserModel.findById(userId)
    .then((user) => {
      const { image, password, ...userObject } = user.toObject();
      if (user) response.status(200).json(userObject);
      else throw new ErrorModel(401, "user not found");
    })
    .catch((err) => next(err));
};

const getAllUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return UserModel.find()
    .populate("ratings.id_posted")
    .then((users) => {
      if (!users) throw new ErrorModel(401, "No users to show");
      const usersObj = users.map((u) => (u.password = ""));
      usersObj
        ? response.status(200).json(usersObj)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

export default {
  getUser,
  getAllUsers,
  addRating,
  addFavoriteEvent,
  removeFavoriteEvent,
};
