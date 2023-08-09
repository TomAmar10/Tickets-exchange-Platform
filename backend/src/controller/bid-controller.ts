import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { BidModel } from "../models/bid";

const addBid = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const bid = request.body;
  const newBid = new BidModel({
    _id: new mongoose.Types.ObjectId(),
    ...bid,
  });

  try {
    const savedBid = await newBid.save();
    const populatedBid = await BidModel.populate(savedBid, [
      { path: "tickets", populate: { path: "id_event" } },
      { path: "id_bidder" },
      { path: "id_owner" },
    ]);
    return response.status(201).json(populatedBid);
  } catch (err) {
    return next(err);
  }
};

const getBid = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const bidId = request.params.bidId;
  return BidModel.findById(bidId)
    .populate([
      { path: "tickets", populate: { path: "id_event" } },
      "id_bidder",
      "id_owner",
    ])
    .then((bid: any) => {
      bid
        ? response.status(200).json(bid)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAllBids = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return BidModel.find()
    .populate([
      { path: "tickets", populate: { path: "id_event" } },
      "id_bidder",
      "id_owner",
    ])
    .then((bids) => {
      bids
        ? response.status(200).json(bids)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getUserBids = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id_user = request.params.id_user;
  return BidModel.find({
    $or: [{ id_bidder: id_user }, { id_owner: id_user }],
  })
    .populate([
      { path: "tickets", populate: { path: "id_event" } },
      "id_bidder",
      "id_owner",
    ])
    .then((bids) => {
      bids
        ? response.status(200).json(bids)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const updateBid = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const bidId = request.params.bidId;

  return BidModel.findById(bidId)
    .then((bid) => {
      if (bid) {
        bid.set(request.body);
        return bid
          .save()
          .then((bid) => response.status(201).json(bid))
          .catch((err) => response.status(500).json(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteBid = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const bidId = request.params.bidId;
  return BidModel.findByIdAndDelete(bidId)
    .then((bid) =>
      bid
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getBid,
  getAllBids,
  addBid,
  updateBid,
  deleteBid,
  getUserBids,
};


