import express from "express";
import controller from "../controller/deal-controller";

const router = express.Router();

router.get("/single/:dealId", controller.getDeal);
router.get("/all", controller.getAllDeals);
router.post("/single/add", controller.addDeal);
router.patch("/single/update/:dealId", controller.updateDeal);
router.delete("/single/delete/:dealId", controller.deleteDeal);

export default router;
