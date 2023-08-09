import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { SubscribeModel } from "../models/subscribe";

const addSubscribe = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const subscribe = request.body;
  const newSubscribe = new SubscribeModel({
    _id: new mongoose.Types.ObjectId(),
    ...subscribe,
  });
  return newSubscribe
    .save()
    .then((subscribe) => response.status(201).json(subscribe))
    .catch((err) => next(err));
};

const getSubscribe = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const subscribeId = request.params.subscribeId;
  return SubscribeModel.findById(subscribeId)
    .then((subscribe: any) => {
      subscribe
        ? response.status(200).json(subscribe)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAllSubscribes = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return SubscribeModel.find()
    .then((subscribes) => {
      subscribes
        ? response.status(200).json(subscribes)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};


const updateSubscribe = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const subscribeId = request.params.subscribeId;

  return SubscribeModel.findById(subscribeId)
    .then((subscribe) => {
      if (subscribe) {
        subscribe.set(request.body);
        return subscribe
          .save()
          .then((subscribe) => response.status(201).json(subscribe))
          .catch((err) => response.status(500).json(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteSubscribe = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const subscribeId = request.params.subscribeId;
  return SubscribeModel.findByIdAndDelete(subscribeId)
    .then((subscribe) =>
      subscribe
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getSubscribe,
  getAllSubscribes,
  addSubscribe,
  updateSubscribe,
  deleteSubscribe,
};
