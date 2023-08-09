"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var generateToken = function (user) {
    var token = jsonwebtoken_1.default.sign({ user: user }, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: "30m",
    });
    return token;
};
var generateRefreshToken = function (user) {
    var token = jsonwebtoken_1.default.sign({ user: user }, process.env.ACCESS_SECRET_REFRESH_TOKEN, {
        expiresIn: "150d",
    });
    return token;
};
var getUserFromToken = function (authHeader) {
    var token = authHeader.split(" ")[1];
    var payload = jsonwebtoken_1.default.decode(token);
    var user = payload;
    return user;
};
exports.default = { generateToken: generateToken, getUserFromToken: getUserFromToken, generateRefreshToken: generateRefreshToken };
