import express from "express";
import controller from "../controller/bid-controller";

const router = express.Router();

router.get("/single/:id_bid", controller.getBid);
router.get("/all", controller.getAllBids);
router.get("/all/by_user/:id_user", controller.getUserBids);
router.post("/single/add", controller.addBid);
router.patch("/single/update/:bidId", controller.updateBid);
router.delete("/single/delete/:bidId", controller.deleteBid);

export default router;
