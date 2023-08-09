"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bid_controller_1 = __importDefault(require("../controller/bid-controller"));
var router = express_1.default.Router();
router.get("/single/:id_bid", bid_controller_1.default.getBid);
router.get("/all", bid_controller_1.default.getAllBids);
router.get("/all/by_user/:id_user", bid_controller_1.default.getUserBids);
router.post("/single/add", bid_controller_1.default.addBid);
router.patch("/single/update/:bidId", bid_controller_1.default.updateBid);
router.delete("/single/delete/:bidId", bid_controller_1.default.deleteBid);
exports.default = router;
