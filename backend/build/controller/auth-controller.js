"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var mongoose_1 = __importDefault(require("mongoose"));
var user_1 = require("../models/user");
var dotenv_1 = __importDefault(require("dotenv"));
var error_1 = __importDefault(require("../models/error"));
var jwt_helper_1 = __importDefault(require("../utils/jwt-helper"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var sendEmail_1 = __importStar(require("../utils/sendEmail"));
var bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
var register = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = request.body;
                _a = user_1.UserModel.bind;
                return [4 /*yield*/, __assign({ _id: new mongoose_1.default.Types.ObjectId() }, user)];
            case 1:
                newUser = new (_a.apply(user_1.UserModel, [void 0, _b.sent()]))();
                return [2 /*return*/, newUser
                        .save()
                        .then(function (user) {
                        var _a = user.toObject(), image = _a.image, password = _a.password, userToToken = __rest(_a, ["image", "password"]);
                        var token = jwt_helper_1.default.generateToken(userToToken);
                        var refreshToken = jwt_helper_1.default.generateRefreshToken(userToToken);
                        response.set({ authorization: token, refreshToken: refreshToken });
                        response.status(201).json({ image: image });
                    })
                        .catch(function (err) { return next(err); })];
        }
    });
}); };
var login = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userDetails;
    return __generator(this, function (_a) {
        userDetails = request.body;
        return [2 /*return*/, user_1.UserModel.findOne({ email: userDetails.email })
                .then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                var isAuthPass, _a, image, password, userToToken, token, refreshToken;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!user)
                                throw new error_1.default(401, "wrong details !");
                            return [4 /*yield*/, bcrypt_1.default.compare(userDetails.password, user.password)];
                        case 1:
                            isAuthPass = _b.sent();
                            if (!isAuthPass)
                                throw new error_1.default(401, "wrong details !");
                            _a = user.toObject(), image = _a.image, password = _a.password, userToToken = __rest(_a, ["image", "password"]);
                            token = jwt_helper_1.default.generateToken(userToToken);
                            refreshToken = jwt_helper_1.default.generateRefreshToken(userToToken);
                            response.set({ authorization: token, refreshToken: refreshToken });
                            response.status(200).json({ image: image });
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (err) { return next(err); })];
    });
}); };
var updateUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, userDetails;
    return __generator(this, function (_a) {
        userId = request.params.userId;
        userDetails = request.body;
        return [2 /*return*/, user_1.UserModel.findById(userId)
                .then(function (user) { return __awaiter(void 0, void 0, void 0, function () {
                var isAuthPass;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!user) return [3 /*break*/, 2];
                            return [4 /*yield*/, bcrypt_1.default.compare(userDetails.password, user.password)];
                        case 1:
                            isAuthPass = _a.sent();
                            if (!isAuthPass)
                                throw new error_1.default(401, "wrong details !");
                            if (userDetails.new_password)
                                userDetails.password = userDetails.new_password;
                            if (!userDetails.image)
                                userDetails.image = "";
                            user.set(userDetails);
                            return [2 /*return*/, user
                                    .save()
                                    .then(function (user) {
                                    var _a = user.toObject(), image = _a.image, password = _a.password, userToToken = __rest(_a, ["image", "password"]);
                                    var token = jwt_helper_1.default.generateToken(userToToken);
                                    var refreshToken = jwt_helper_1.default.generateRefreshToken(userToToken);
                                    response.set({ authorization: token, refreshToken: refreshToken });
                                    response.status(201).json({ image: image });
                                })
                                    .catch(function (err) { return next(err); })];
                        case 2:
                            response.status(404).json({ message: "Something went wrong" });
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (err) { return next(err); })];
    });
}); };
var deleteUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    return __generator(this, function (_a) {
        userId = request.params.userId;
        return [2 /*return*/, user_1.UserModel.findByIdAndDelete(userId)
                .then(function (user) {
                return user
                    ? response.status(201).json({ message: "deleted" })
                    : response.status(404).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getPassportUser = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, image, password, userToToken, token, refreshToken_1;
    return __generator(this, function (_b) {
        if (request.user) {
            user = request.user;
            user.googleId = "";
            _a = user.toObject(), image = _a.image, password = _a.password, userToToken = __rest(_a, ["image", "password"]);
            token = jwt_helper_1.default.generateToken(userToToken);
            refreshToken_1 = jwt_helper_1.default.generateRefreshToken(userToToken);
            response.set({ authorization: token, refreshToken: refreshToken_1 });
            response.status(201).json({ image: image });
        }
        else {
            response.clearCookie("hotix-api-cookie-session");
            response.status(403).json({
                error: true,
                message: "Registration has failed",
            });
        }
        return [2 /*return*/];
    });
}); };
var logout = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        request.logout(function (err) {
            if (err) {
                return next(err);
            }
            response.clearCookie("hotix-api-cookie-session");
            response.status(200).json("Logged out successfully");
        });
        return [2 /*return*/];
    });
}); };
var forgotPassword = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, oldUser, secret, token, link, content, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = request.body.email;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.UserModel.findOne({ email: email })];
            case 2:
                oldUser = _a.sent();
                if (!oldUser)
                    throw new error_1.default(401, "User not exist!");
                secret = "secret-key-for-now" + oldUser.password;
                token = jsonwebtoken_1.default.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "5m" });
                link = "".concat(process.env.CLIENT_SIDE_URL, "/auth/reset-password/").concat(oldUser._id, "/").concat(token);
                content = (0, sendEmail_1.createEmailContent)(link, oldUser.first_name);
                return [4 /*yield*/, (0, sendEmail_1.default)(email, "HOTIX Password Reset", content)];
            case 3:
                _a.sent();
                response
                    .status(200)
                    .json({ message: "A link was sent to your email successfully" });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var resetPassCheckValidity = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, token, oldUser, secret, verify;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.params, id = _a.id, token = _a.token;
                return [4 /*yield*/, user_1.UserModel.findOne({ _id: id })];
            case 1:
                oldUser = _b.sent();
                if (!oldUser)
                    throw new error_1.default(401, "User not exist!");
                secret = "secret-key-for-now" + oldUser.password;
                try {
                    verify = jsonwebtoken_1.default.verify(token, secret);
                    response.status(200).json({ message: "Valid url" });
                }
                catch (err) {
                    next(err);
                }
                return [2 /*return*/];
        }
    });
}); };
var resetPasswordPost = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, token, password, oldUser, secret, hashPass, verify, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.params, id = _a.id, token = _a.token;
                password = request.body.password;
                return [4 /*yield*/, user_1.UserModel.findOne({ _id: id })];
            case 1:
                oldUser = _b.sent();
                if (!oldUser)
                    throw new error_1.default(401, "User not exist!");
                secret = "secret-key-for-now" + oldUser.password;
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hashPass = _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 6, , 7]);
                return [4 /*yield*/, jsonwebtoken_1.default.verify(token, secret)];
            case 4:
                verify = _b.sent();
                return [4 /*yield*/, user_1.UserModel.updateOne({ _id: id }, { $set: { password: hashPass } })];
            case 5:
                _b.sent();
                response.status(201).json("Password has been reset successfully");
                return [3 /*break*/, 7];
            case 6:
                err_2 = _b.sent();
                next(err_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var refreshToken = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken_2, user, image, password, userToToken, token, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                refreshToken_2 = request.headers.authorization;
                user = jwt_helper_1.default.getUserFromToken(refreshToken_2);
                image = user.image, password = user.password, userToToken = __rest(user, ["image", "password"]);
                return [4 /*yield*/, jwt_helper_1.default.generateToken(userToToken)];
            case 1:
                token = _a.sent();
                response.set({ authorization: token });
                response.status(201).json(image);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    register: register,
    login: login,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getPassportUser: getPassportUser,
    logout: logout,
    forgotPassword: forgotPassword,
    resetPassCheckValidity: resetPassCheckValidity,
    resetPasswordPost: resetPasswordPost,
    refreshToken: refreshToken,
};
