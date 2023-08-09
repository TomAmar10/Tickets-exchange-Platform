import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { IUser, UserModel } from "../models/user";
import dotenv from "dotenv";
import ErrorModel from "../models/error";
import jwtHelper from "../utils/jwt-helper";
import jwt from "jsonwebtoken";
import sendEmail, { createEmailContent } from "../utils/sendEmail";
import bcrypt from "bcrypt";
dotenv.config();

const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.body;
  const newUser = new UserModel(
    await {
      _id: new mongoose.Types.ObjectId(),
      ...user,
    }
  );
  return newUser
    .save()
    .then((user) => {
      const { image, password, ...userToToken } = user.toObject();
      const token = jwtHelper.generateToken(userToToken);
      const refreshToken = jwtHelper.generateRefreshToken(userToToken);
      response.set({ authorization: token, refreshToken });
      response.status(201).json({ image });
    })
    .catch((err) => next(err));
};

const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userDetails = request.body;
  return UserModel.findOne({ email: userDetails.email })
    .then(async (user) => {
      if (!user) throw new ErrorModel(401, "wrong details !");
      const isAuthPass = await bcrypt.compare(
        userDetails.password,
        user.password
      );
      if (!isAuthPass) throw new ErrorModel(401, "wrong details !");
      const { image, password, ...userToToken } = user.toObject();
      const token = jwtHelper.generateToken(userToToken);
      const refreshToken = jwtHelper.generateRefreshToken(userToToken);
      response.set({ authorization: token, refreshToken });
      response.status(200).json({ image });
    })
    .catch((err) => next(err));
};

const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.userId;
  const userDetails = request.body;
  return UserModel.findById(userId)
    .then(async (user) => {
      if (user) {
        const isAuthPass = await bcrypt.compare(
          userDetails.password,
          user.password
        );
        if (!isAuthPass) throw new ErrorModel(401, "wrong details !");
        if (userDetails.new_password)
          userDetails.password = userDetails.new_password;
        if (!userDetails.image) userDetails.image = "";
        user.set(userDetails);
        return user
          .save()
          .then((user) => {
            const { image, password, ...userToToken } = user.toObject();
            const token = jwtHelper.generateToken(userToToken);
            const refreshToken = jwtHelper.generateRefreshToken(userToToken);
            response.set({ authorization: token, refreshToken });
            response.status(201).json({ image });
          })
          .catch((err) => next(err));
      } else {
        response.status(404).json({ message: "Something went wrong" });
      }
    })
    .catch((err) => next(err));
};

const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.userId;
  return UserModel.findByIdAndDelete(userId)
    .then((user) =>
      user
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const getPassportUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.user) {
    const user: any = request.user;
    user.googleId = "";
    const { image, password, ...userToToken } = user.toObject();
    const token = jwtHelper.generateToken(userToToken);
    const refreshToken = jwtHelper.generateRefreshToken(userToToken);
    response.set({ authorization: token, refreshToken });
    response.status(201).json({ image });
  } else {
    response.clearCookie("hotix-api-cookie-session");
    response.status(403).json({
      error: true,
      message: "Registration has failed",
    });
  }
};

const logout = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  request.logout((err: any) => {
    if (err) {
      return next(err);
    }
    response.clearCookie("hotix-api-cookie-session");
    response.status(200).json("Logged out successfully");
  });
};

const forgotPassword = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const email = request.body.email;
  try {
    const oldUser: IUser = await UserModel.findOne({ email });
    if (!oldUser) throw new ErrorModel(401, "User not exist!");
    const secret = "secret-key-for-now" + oldUser.password;
    const token = jwt.sign(
      { email: oldUser.email, id: (oldUser as any)._id },
      secret,
      { expiresIn: "5m" }
    );
    const link = `${process.env.CLIENT_SIDE_URL}/auth/reset-password/${
      (oldUser as any)._id
    }/${token}`;
    const content = createEmailContent(link, oldUser.first_name);
    await sendEmail(email, "HOTIX Password Reset", content);
    response
      .status(200)
      .json({ message: "A link was sent to your email successfully" });
  } catch (err) {
    next(err);
  }
};

const resetPassCheckValidity = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id, token } = request.params;
  const oldUser: IUser = await UserModel.findOne({ _id: id });
  if (!oldUser) throw new ErrorModel(401, "User not exist!");
  const secret = "secret-key-for-now" + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    response.status(200).json({ message: "Valid url" });
  } catch (err) {
    next(err);
  }
};

const resetPasswordPost = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id, token } = request.params;
  const password = request.body.password;
  const oldUser: IUser = await UserModel.findOne({ _id: id });
  if (!oldUser) throw new ErrorModel(401, "User not exist!");
  const secret = "secret-key-for-now" + oldUser.password;
  const hashPass = await bcrypt.hash(password, 10);
  try {
    const verify = await jwt.verify(token, secret);
    await UserModel.updateOne({ _id: id }, { $set: { password: hashPass } });
    response.status(201).json("Password has been reset successfully");
  } catch (err) {
    next(err);
  }
};

const refreshToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = request.headers.authorization;
    const user = jwtHelper.getUserFromToken(refreshToken);
    const { image, password, ...userToToken } = user;
    const token = await jwtHelper.generateToken(userToToken);
    response.set({ authorization: token });
    response.status(201).json(image);
  } catch (err) {
    next(err);
  }
};

export default {
  register,
  login,
  updateUser,
  deleteUser,
  getPassportUser,
  logout,
  forgotPassword,
  resetPassCheckValidity,
  resetPasswordPost,
  refreshToken,
};
