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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var deal_1 = require("../models/deal");
var bid_1 = require("../models/bid");
var ticket_1 = require("../models/ticket");
var addDeal = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var deal, newId, newDeal;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deal = request.body;
                newId = new mongoose_1.default.Types.ObjectId();
                newDeal = new deal_1.DealModel(__assign({ _id: newId }, deal));
                // Update bid in the 'bids' schema
                return [4 /*yield*/, bid_1.BidModel.findByIdAndUpdate(deal.id_bid, {
                        $set: { status: bid_1.StatusBid.CONFIRMED },
                    })];
            case 1:
                // Update bid in the 'bids' schema
                _a.sent();
                // Update tickets in the 'tickets' schema
                return [4 /*yield*/, ticket_1.TicketModel.updateMany({ _id: { $in: deal.tickets } }, { $set: { id_owner: deal.id_buyer, open_for_sale: false, id_deal: newId } })];
            case 2:
                // Update tickets in the 'tickets' schema
                _a.sent();
                return [2 /*return*/, newDeal
                        .save()
                        .then(function (deal) { return response.status(201).json(deal); })
                        .catch(function (err) { return next(err); })];
        }
    });
}); };
var getDeal = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dealId;
    return __generator(this, function (_a) {
        dealId = request.params.dealId;
        return [2 /*return*/, deal_1.DealModel.findById(dealId)
                .populate(["id_ticket", "id_seller", "id_buyer"])
                .then(function (deal) {
                deal
                    ? response.status(200).json(deal)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getAllDeals = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, deal_1.DealModel.find()
                .populate(["id_ticket", "id_seller", "id_buyer"])
                .then(function (deals) {
                deals
                    ? response.status(200).json(deals)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getUserDeals = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId;
    return __generator(this, function (_a) {
        userId = request.params.userId;
        return [2 /*return*/, deal_1.DealModel.find({ userId: userId })
                .populate(["id_ticket", "id_seller", "id_buyer"])
                .then(function (deals) {
                deals
                    ? response.status(200).json(deals)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var updateDeal = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dealId;
    return __generator(this, function (_a) {
        dealId = request.params.dealId;
        return [2 /*return*/, deal_1.DealModel.findById(dealId)
                .then(function (deal) {
                if (deal) {
                    deal.set(request.body);
                    return deal
                        .save()
                        .then(function (deal) { return response.status(201).json(deal); })
                        .catch(function (err) { return response.status(500).json(err); });
                }
                else {
                    response.status(404).json({ message: "not found" });
                }
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var deleteDeal = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var dealId;
    return __generator(this, function (_a) {
        dealId = request.params.dealId;
        return [2 /*return*/, deal_1.DealModel.findByIdAndDelete(dealId)
                .then(function (deal) {
                return deal
                    ? response.status(201).json({ message: "deleted" })
                    : response.status(404).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
exports.default = {
    getDeal: getDeal,
    getAllDeals: getAllDeals,
    addDeal: addDeal,
    updateDeal: updateDeal,
    deleteDeal: deleteDeal,
    getUserDeals: getUserDeals,
};
