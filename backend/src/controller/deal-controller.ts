import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { IDeal } from "../models/deal";
import { DealModel } from "../models/deal";
import { BidModel, StatusBid } from "../models/bid";
import { TicketModel } from "../models/ticket";

const addDeal = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const deal: IDeal = request.body;
  const newId = new mongoose.Types.ObjectId();
  const newDeal = new DealModel({
    _id: newId,
    ...deal,
  });
  // Update bid in the 'bids' schema
  await BidModel.findByIdAndUpdate(deal.id_bid, {
    $set: { status: StatusBid.CONFIRMED },
  });

  // Update tickets in the 'tickets' schema
  await TicketModel.updateMany(
    { _id: { $in: deal.tickets } },
    { $set: { id_owner: deal.id_buyer, open_for_sale: false, id_deal: newId } }
  );

  return newDeal
    .save()
    .then((deal) => response.status(201).json(deal))
    .catch((err) => next(err));
};

const getDeal = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const dealId = request.params.dealId;
  return DealModel.findById(dealId)
    .populate(["id_ticket", "id_seller", "id_buyer"])
    .then((deal: any) => {
      deal
        ? response.status(200).json(deal)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAllDeals = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return DealModel.find()
    .populate(["id_ticket", "id_seller", "id_buyer"])
    .then((deals) => {
      deals
        ? response.status(200).json(deals)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getUserDeals = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.userId;
  return DealModel.find({ userId })
    .populate(["id_ticket", "id_seller", "id_buyer"])
    .then((deals) => {
      deals
        ? response.status(200).json(deals)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const updateDeal = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const dealId = request.params.dealId;

  return DealModel.findById(dealId)
    .then((deal) => {
      if (deal) {
        deal.set(request.body);
        return deal
          .save()
          .then((deal) => response.status(201).json(deal))
          .catch((err) => response.status(500).json(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteDeal = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const dealId = request.params.dealId;
  return DealModel.findByIdAndDelete(dealId)
    .then((deal) =>
      deal
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getDeal,
  getAllDeals,
  addDeal,
  updateDeal,
  deleteDeal,
  getUserDeals,
};
