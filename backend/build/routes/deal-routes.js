"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var deal_controller_1 = __importDefault(require("../controller/deal-controller"));
var router = express_1.default.Router();
router.get("/single/:dealId", deal_controller_1.default.getDeal);
router.get("/all", deal_controller_1.default.getAllDeals);
router.post("/single/add", deal_controller_1.default.addDeal);
router.patch("/single/update/:dealId", deal_controller_1.default.updateDeal);
router.delete("/single/delete/:dealId", deal_controller_1.default.deleteDeal);
exports.default = router;
