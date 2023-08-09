import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import errorModel from "./models/error";
import catchAll from "./middleware/catch-all";
import UserRouter from "./routes/user-routes";
import AuthRouter from "./routes/auth-routes";
import EventRouter from "./routes/event-routes";
import TicketRouter from "./routes/ticket-routes";
import DealRouter from "./routes/deal-routes";
import CategoryRouter from "./routes/category-routes";
import BidRouter from "./routes/bid-routes";
import SubscribeRouter from "./routes/subscribe-routes";
import stripeRouter from "./routes/stripe-routes";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { config } from "./utils/config";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
require("./utils/facebook-auth");
require("./utils/google-auth");

dotenv.config();

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const server = express();
server.use(
  cors({
    origin: [process.env.CLIENT_SIDE_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "refreshToken"],
    exposedHeaders: ["Authorization", "refreshToken"],
    credentials: true,
  })
);

// PRODUCTION
// server.set("trust proxy", 1);
// server.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       sameSite: "none",
//       secure: true,
//       maxAge: 1000 * 60 * 60 * 24 * 2, // two days
//     },
//   })
// );

// DEVELOPMENT
server.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

server.use(passport.initialize());
server.use(passport.session());

server.use(bodyParser.json({ limit: "5mb" }));
server.use(
  bodyParser.urlencoded({
    limit: "10mb",
    extended: false,
  })
);

server.use(express.json());

server.use("/hotix/api/users", UserRouter);
server.use("/hotix/api/auth", AuthRouter);
server.use("/hotix/api/events", EventRouter);
server.use("/hotix/api/tickets", TicketRouter);
server.use("/hotix/api/deals", DealRouter);
server.use("/hotix/api/categories", CategoryRouter);
server.use("/hotix/api/bids", BidRouter);
server.use("/hotix/api/subscribes", SubscribeRouter);
server.use("/hotix/api/payments", stripeRouter);
server.use("*", (Request: Request, response: Response, next: NextFunction) => {
  next(new errorModel(404, "route not found!"));
});
server.use(catchAll);

server.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);
