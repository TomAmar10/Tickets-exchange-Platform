import express from "express";
import controller from "../controller/subscribe-controller";

const router = express.Router();

router.get("/single/:subscribeId", controller.getSubscribe);
router.get("/all", controller.getAllSubscribes);
router.post("/single/add", controller.addSubscribe);
router.patch("/single/update/:subscribeId", controller.updateSubscribe);
router.delete("/single/delete/:subscribeId", controller.deleteSubscribe);

export default router;
