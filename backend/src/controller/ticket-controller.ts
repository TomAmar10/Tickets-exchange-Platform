import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ITicket, TicketModel } from "../models/ticket";
import translateImg from "../utils/translateImage";

const addTicket = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const ticket = request.body;
  const newTicket = new TicketModel({
    _id: new mongoose.Types.ObjectId(),
    ...ticket,
  });
  return newTicket
    .save()
    .then((ticket) => response.status(201).json(ticket))
    .catch((err) => next(err));
};

const addFewTickets = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const tickets: ITicket[] = request.body;
  const savedTickets = [];

  for (let i = 0; i < tickets.length; i++) {
    const ticketImg = tickets[i].image;
    const { price, currency } = await translateImg(ticketImg);
    const newTicket = new TicketModel({
      _id: new mongoose.Types.ObjectId(),
      ...tickets[i],
    });

    try {
      const savedTicket = await newTicket.save();
      savedTickets.push(savedTicket);
    } catch (err) {
      return next(err);
    }
  }
  try {
    const populatedTickets = await TicketModel.populate(savedTickets, [
      { path: "id_event" },
      { path: "id_owner" },
      {
        path: "id_deal",
        populate: [{ path: "id_seller" }, { path: "id_buyer" }],
      },
    ]);
    return response.status(201).json(populatedTickets);
  } catch (err) {
    return next(err);
  }
};

const getTicket = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const ticketId = request.params.ticketId;
  return TicketModel.findById(ticketId)
    .populate([
      { path: "id_event" },
      { path: "id_owner" },
      {
        path: "id_deal",
        populate: [{ path: "id_seller" }, { path: "id_buyer" }],
      },
    ])
    .then((ticket: any) => {
      ticket
        ? response.status(200).json(ticket)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getAllTickets = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return TicketModel.find()
    .populate([
      { path: "id_event" },
      { path: "id_owner" },
      {
        path: "id_deal",
        populate: [{ path: "id_seller" }, { path: "id_buyer" }],
      },
    ])
    .then((tickets) => {
      tickets
        ? response.status(200).json(tickets)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getEventTicketsForSale = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id_event = request.params.eventId;
  return TicketModel.find({ id_event, open_for_sale: true })
    .populate([
      { path: "id_event" },
      { path: "id_owner" },
      {
        path: "id_deal",
        populate: [{ path: "id_seller" }, { path: "id_buyer" }],
      },
    ])
    .then((tickets) => {
      tickets
        ? response.status(200).json(tickets)
        : response.status(200).json({ message: "not found" });
    })
    .catch((err) => next(err));
};

const getUserTickets = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id_owner = request.params.userId;

  try {
    const tickets = await TicketModel.find({ id_owner }).populate([
      { path: "id_event" },
      { path: "id_owner" },
      {
        path: "id_deal",
        populate: [{ path: "id_seller" }, { path: "id_buyer" }],
      },
    ]);

    if (tickets) {
      return response.status(200).json(tickets);
    } else {
      return response.status(200).json({ message: "not found" });
    }
  } catch (err) {
    return next(err);
  }
};

const updateTicket = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const ticketId = request.params.ticketId;
  return TicketModel.findById(ticketId)
    .then((ticket) => {
      if (ticket) {
        ticket.set(request.body);
        return ticket
          .save()
          .then((ticket) => response.status(201).json(ticket))
          .catch((err) => response.status(500).json(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteTicket = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const ticketId = request.params.ticketId;
  return TicketModel.findByIdAndDelete(ticketId)
    .then((ticket) =>
      ticket
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getTicket,
  getAllTickets,
  addTicket,
  addFewTickets,
  updateTicket,
  deleteTicket,
  getEventTicketsForSale,
  getUserTickets,
};
