"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var event_controller_1 = __importDefault(require("../controller/event-controller"));
var router = express_1.default.Router();
router.get("/single/:eventId", event_controller_1.default.getEvent);
router.get("/all", event_controller_1.default.getAllEvents);
router.post("/single/add", event_controller_1.default.addEvent);
router.patch("/single/update/:eventId", event_controller_1.default.updateEvent);
router.delete("/single/delete/:eventId", event_controller_1.default.deleteEvent);
exports.default = router;
