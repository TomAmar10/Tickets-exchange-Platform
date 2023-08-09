"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var dotenv_1 = __importDefault(require("dotenv"));
var error_1 = __importDefault(require("../models/error"));
var deal_1 = require("../models/deal");
dotenv_1.default.config();
var addRating = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_user_to_rate, rating, star, id_posted, id_deal, comment, is_seller, getAllRatings, ratingsAmount, ratingSum, total_rating, ratedUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id_user_to_rate = request.params.id_user_to_rate;
                rating = request.body;
                star = rating.star, id_posted = rating.id_posted, id_deal = rating.id_deal, comment = rating.comment, is_seller = rating.is_seller;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(id_user_to_rate, {
                        $push: {
                            ratings: {
                                star: star,
                                id_posted: id_posted,
                                comment: comment,
                            },
                        },
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, deal_1.DealModel.findByIdAndUpdate(id_deal, is_seller
                        ? { $set: { is_seller_rated: true } }
                        : { $set: { is_buyer_rated: true } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, user_1.UserModel.findById(id_user_to_rate)];
            case 4:
                getAllRatings = _a.sent();
                ratingsAmount = getAllRatings.ratings.length;
                ratingSum = getAllRatings.ratings
                    .map(function (r) { return r.star; })
                    .reduce(function (prev, curr) { return prev + curr; }, 0);
                total_rating = Math.round(ratingSum / ratingsAmount);
                return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(id_user_to_rate, {
                        total_rating: total_rating,
                    })];
            case 5:
                ratedUser = _a.sent();
                ratedUser.password = "";
                response.status(201).json(ratedUser);
                return [3 /*break*/, 7];
            case 6:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var addFavoriteEvent = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_user, id_event, user, _a, image, password, userToToken, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_user = request.params.id_user;
                id_event = request.body.id_event;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(id_user, {
                        $push: {
                            favorites: id_event,
                        },
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, user_1.UserModel.findById(id_user)];
            case 3:
                user = _b.sent();
                if (!user)
                    throw new error_1.default(404, "User not found");
                _a = user.toObject(), image = _a.image, password = _a.password, userToToken = __rest(_a, ["image", "password"]);
                response.status(201).json(userToToken);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                next(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var removeFavoriteEvent = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_user, id_event, user, _a, image, password, userToToken, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id_user = request.params.id_user;
                id_event = request.body.id_event;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.UserModel.findByIdAndUpdate(id_user, {
                        $pull: {
                            favorites: id_event,
                        },
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, user_1.UserModel.findById(id_user)];
            case 3:
                user = _b.sent();
                if (!user)
                    throw new error_1.default(404, "User not found");
                _a = user.toObject(), image = _a.image, password = _a.password, userToToken = __rest(_a, ["image", "password"]);
                response.status(201).json(userToToken);
                return [3 /*break*/, 5];
            case 4:
                err_3 = _b.sent();
                next(err_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    return __generator(this, function (_a) {
        userId = request.params.userId;
        return [2 /*return*/, user_1.UserModel.findById(userId)
                .then(function (user) {
                var _a = user.toObject(), image = _a.image, password = _a.password, userObject = __rest(_a, ["image", "password"]);
                if (user)
                    response.status(200).json(userObject);
                else
                    throw new error_1.default(401, "user not found");
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getAllUsers = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, user_1.UserModel.find()
                .populate("ratings.id_posted")
                .then(function (users) {
                if (!users)
                    throw new error_1.default(401, "No users to show");
                var usersObj = users.map(function (u) { return (u.password = ""); });
                usersObj
                    ? response.status(200).json(usersObj)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
exports.default = {
    getUser: getUser,
    getAllUsers: getAllUsers,
    addRating: addRating,
    addFavoriteEvent: addFavoriteEvent,
    removeFavoriteEvent: removeFavoriteEvent,
};
