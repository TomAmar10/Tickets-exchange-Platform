import express from "express";
import controller from "../controller/stripe-controller";

const router = express.Router();

router.post("/create-checkout-session", controller.createCheckout);
export default router;
