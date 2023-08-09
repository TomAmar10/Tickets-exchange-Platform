import jwt from "jsonwebtoken";
import { IUser } from "../models/user";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (user: IUser | {}) => {
  const token = jwt.sign({ user }, process.env.ACCESS_SECRET_TOKEN, {
    expiresIn: "30m",
  });
  return token;
};
const generateRefreshToken = (user: IUser | {}) => {
  const token = jwt.sign({ user }, process.env.ACCESS_SECRET_REFRESH_TOKEN, {
    expiresIn: "150d",
  });
  return token;
};

const getUserFromToken = (authHeader: string): IUser => {
  const token = authHeader.split(" ")[1];
  const payload = jwt.decode(token);
  const user = payload as IUser;
  return user;
};

export default { generateToken, getUserFromToken, generateRefreshToken };
