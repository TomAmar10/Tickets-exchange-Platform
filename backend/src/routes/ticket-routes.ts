import express from "express";
import controller from "../controller/ticket-controller";
import authMiddleWare from "../middleware/auth-middleware";

const router = express.Router();

router.get("/single/:ticketId", controller.getTicket);
router.get("/all", controller.getAllTickets);
router.get("/all/by-event/:eventId", controller.getEventTicketsForSale);
router.get("/all/by-user/:userId", controller.getUserTickets);
router.post("/single/add", controller.addTicket);
router.post("/few/add", authMiddleWare, controller.addFewTickets);
router.patch("/single/update/:ticketId", controller.updateTicket);
router.delete("/single/delete/:ticketId", controller.deleteTicket);

export default router;
