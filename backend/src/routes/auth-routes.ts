import express from "express";
import controller from "../controller/auth-controller";
import passport from "passport";
import dotenv from "dotenv";
import authMiddleWare from "../middleware/auth-middleware";
dotenv.config();

const router = express.Router();

router.get("/single/logout", controller.logout);
router.post("/single/register", controller.register);
router.post("/single/login", controller.login);
router.post("/forgot-password", controller.forgotPassword);
router.get("/reset-password/:id/:token", controller.resetPassCheckValidity);
router.post("/reset-password/:id/:token", controller.resetPasswordPost);
router.patch("/single/update/:userId", controller.updateUser);
router.delete("/single/delete/:userId", controller.deleteUser);
router.get("/refresh-token", authMiddleWare, controller.refreshToken);
router.get("/passport/get-user", controller.getPassportUser);
// GOOGLE
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_SIDE_URL}/choose-mode?case=passport`,
    failureRedirect: `${process.env.CLIENT_SIDE_URL}/auth/login`,
  })
);
// FACEBOOK
router.get("/facebook", passport.authenticate("facebook", { scope: "email" }));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: `${process.env.CLIENT_SIDE_URL}/choose-mode?case=passport`,
    failureRedirect: `${process.env.CLIENT_SIDE_URL}/auth/login`,
  })
);

export default router;
