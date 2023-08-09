"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ticket_controller_1 = __importDefault(require("../controller/ticket-controller"));
var auth_middleware_1 = __importDefault(require("../middleware/auth-middleware"));
var router = express_1.default.Router();
router.get("/single/:ticketId", ticket_controller_1.default.getTicket);
router.get("/all", ticket_controller_1.default.getAllTickets);
router.get("/all/by-event/:eventId", ticket_controller_1.default.getEventTicketsForSale);
router.get("/all/by-user/:userId", ticket_controller_1.default.getUserTickets);
router.post("/single/add", ticket_controller_1.default.addTicket);
router.post("/few/add", auth_middleware_1.default, ticket_controller_1.default.addFewTickets);
router.patch("/single/update/:ticketId", ticket_controller_1.default.updateTicket);
router.delete("/single/delete/:ticketId", ticket_controller_1.default.deleteTicket);
exports.default = router;
