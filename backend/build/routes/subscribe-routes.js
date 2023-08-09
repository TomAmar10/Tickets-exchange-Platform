"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var subscribe_controller_1 = __importDefault(require("../controller/subscribe-controller"));
var router = express_1.default.Router();
router.get("/single/:subscribeId", subscribe_controller_1.default.getSubscribe);
router.get("/all", subscribe_controller_1.default.getAllSubscribes);
router.post("/single/add", subscribe_controller_1.default.addSubscribe);
router.patch("/single/update/:subscribeId", subscribe_controller_1.default.updateSubscribe);
router.delete("/single/delete/:subscribeId", subscribe_controller_1.default.deleteSubscribe);
exports.default = router;
