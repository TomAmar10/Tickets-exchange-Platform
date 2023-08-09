import express from "express";
import controller from "../controller/event-controller";

const router = express.Router();

router.get("/single/:eventId", controller.getEvent);
router.get("/all", controller.getAllEvents);
router.post("/single/add", controller.addEvent);
router.patch("/single/update/:eventId", controller.updateEvent);
router.delete("/single/delete/:eventId", controller.deleteEvent);

export default router;
