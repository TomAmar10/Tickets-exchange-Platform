import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { EventModel } from "../models/event";

const addEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const event = request.body;
  const newEvent = new EventModel({
    _id: new mongoose.Types.ObjectId(),
    ...event,
  });
  return newEvent
    .save()
    .then((event) => response.status(201).json(event))
    .catch((err) => next(err));
};

const getEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const EventId = request.params.eventId;
  return EventModel.findById(EventId)
    .populate("id_category")
    .then((event) =>
      event
        ? response.status(200).json(event)
        : response.status(200).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const getAllEvents = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return EventModel.find()
    .populate("id_category")
    .then((events) =>
      events
        ? response.status(200).json(events)
        : response.status(200).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const updateEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const EventId = request.params.eventId;
  return EventModel.findById(EventId)
    .then((event) => {
      if (event) {
        event.set(request.body);
        return event
          .save()
          .then((event) => response.status(201).json(event))
          .catch((err) => next(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteEvent = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const EventId = request.params.eventId;
  return EventModel.findByIdAndDelete(EventId)
    .then((event) =>
      event
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  getEvent,
  getAllEvents,
  addEvent,
  updateEvent,
  deleteEvent,
};
