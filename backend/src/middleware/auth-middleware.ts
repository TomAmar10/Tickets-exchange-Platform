import { Request, Response, NextFunction } from "express";
import ErrorModel from "../models/error";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user";

const authMiddleWare = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const token = request.header("authorization");
    if (!token) throw new ErrorModel(401, "No token sent");
    const isRefresh = request.originalUrl.includes("/refresh-token");
    const jwtSecret = isRefresh
      ? process.env.ACCESS_SECRET_REFRESH_TOKEN
      : process.env.ACCESS_SECRET_TOKEN;
    try {
      const user = await jwt.verify(token.split(" ")[1], jwtSecret);
      request.user = user as IUser;
      next();
    } catch (err) {
      if (err?.name === "TokenExpiredError" && !isRefresh) {
        throw new ErrorModel(403, "Token expired");
      } else {
        throw new ErrorModel(401, "Invalid token");
      }
    }
  } catch (err) {
    next(err); 
  }
};

export default authMiddleWare;
