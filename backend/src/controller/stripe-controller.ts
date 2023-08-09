import { Request, Response, NextFunction } from "express";
import { ITicket } from "../models/ticket";
import dotenv from "dotenv";
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const createCheckout = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const url = process.env.ORIGIN_URL;
    const tickets: ITicket[] = request.body.tickets;
    // const token = request.body.token;
    const line_items = tickets.map((t) => {
      return {
        price_data: {
          currency: t.currency,
          product_data: {
            name: (t.id_event as any).event_name,
            // images: [(t.id_event as any).image],
            description: (t.id_event as any).description,
            metadata: {
              id: (t as any)._id,
            },
          },
          unit_amount: +t.price * 100,
        },
        quantity: 1,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${url}/success`,
      cancel_url: `${url}/cancel`,
    });

    response.json({ url: session.url });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
};

export default {
  createCheckout,
};
