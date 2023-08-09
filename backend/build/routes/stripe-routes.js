"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var stripe_controller_1 = __importDefault(require("../controller/stripe-controller"));
var router = express_1.default.Router();
router.post("/create-checkout-session", stripe_controller_1.default.createCheckout);
exports.default = router;
