"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("../controller/user-controller"));
var router = express_1.default.Router();
router.get("/single/:userId", user_controller_1.default.getUser);
router.get("/all", user_controller_1.default.getAllUsers);
router.post("/single/add-rating/:id_user_to_rate", user_controller_1.default.addRating);
router.post("/single/add-favorite-event/:id_user", user_controller_1.default.addFavoriteEvent);
router.post("/single/remove-favorite-event/:id_user", user_controller_1.default.removeFavoriteEvent);
exports.default = router;
