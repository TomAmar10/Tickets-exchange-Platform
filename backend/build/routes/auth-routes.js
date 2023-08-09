"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_controller_1 = __importDefault(require("../controller/auth-controller"));
var passport_1 = __importDefault(require("passport"));
var dotenv_1 = __importDefault(require("dotenv"));
var auth_middleware_1 = __importDefault(require("../middleware/auth-middleware"));
dotenv_1.default.config();
var router = express_1.default.Router();
router.get("/single/logout", auth_controller_1.default.logout);
router.post("/single/register", auth_controller_1.default.register);
router.post("/single/login", auth_controller_1.default.login);
router.post("/forgot-password", auth_controller_1.default.forgotPassword);
router.get("/reset-password/:id/:token", auth_controller_1.default.resetPassCheckValidity);
router.post("/reset-password/:id/:token", auth_controller_1.default.resetPasswordPost);
router.patch("/single/update/:userId", auth_controller_1.default.updateUser);
router.delete("/single/delete/:userId", auth_controller_1.default.deleteUser);
router.get("/refresh-token", auth_middleware_1.default, auth_controller_1.default.refreshToken);
router.get("/passport/get-user", auth_controller_1.default.getPassportUser);
// GOOGLE
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: "".concat(process.env.CLIENT_SIDE_URL, "/choose-mode?case=passport"),
    failureRedirect: "".concat(process.env.CLIENT_SIDE_URL, "/auth/login"),
}));
// FACEBOOK
router.get("/facebook", passport_1.default.authenticate("facebook", { scope: "email" }));
router.get("/facebook/callback", passport_1.default.authenticate("facebook", {
    successRedirect: "".concat(process.env.CLIENT_SIDE_URL, "/choose-mode?case=passport"),
    failureRedirect: "".concat(process.env.CLIENT_SIDE_URL, "/auth/login"),
}));
exports.default = router;
