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
var ticket_1 = require("../models/ticket");
var translateImage_1 = __importDefault(require("../utils/translateImage"));
var addTicket = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ticket, newTicket;
    return __generator(this, function (_a) {
        ticket = request.body;
        newTicket = new ticket_1.TicketModel(__assign({ _id: new mongoose_1.default.Types.ObjectId() }, ticket));
        return [2 /*return*/, newTicket
                .save()
                .then(function (ticket) { return response.status(201).json(ticket); })
                .catch(function (err) { return next(err); })];
    });
}); };
var addFewTickets = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var tickets, savedTickets, i, ticketImg, _a, price, currency, newTicket, savedTicket, err_1, populatedTickets, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                tickets = request.body;
                savedTickets = [];
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < tickets.length)) return [3 /*break*/, 7];
                ticketImg = tickets[i].image;
                return [4 /*yield*/, (0, translateImage_1.default)(ticketImg)];
            case 2:
                _a = _b.sent(), price = _a.price, currency = _a.currency;
                newTicket = new ticket_1.TicketModel(__assign({ _id: new mongoose_1.default.Types.ObjectId() }, tickets[i]));
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, newTicket.save()];
            case 4:
                savedTicket = _b.sent();
                savedTickets.push(savedTicket);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                return [2 /*return*/, next(err_1)];
            case 6:
                i++;
                return [3 /*break*/, 1];
            case 7:
                _b.trys.push([7, 9, , 10]);
                return [4 /*yield*/, ticket_1.TicketModel.populate(savedTickets, [
                        { path: "id_event" },
                        { path: "id_owner" },
                        {
                            path: "id_deal",
                            populate: [{ path: "id_seller" }, { path: "id_buyer" }],
                        },
                    ])];
            case 8:
                populatedTickets = _b.sent();
                return [2 /*return*/, response.status(201).json(populatedTickets)];
            case 9:
                err_2 = _b.sent();
                return [2 /*return*/, next(err_2)];
            case 10: return [2 /*return*/];
        }
    });
}); };
var getTicket = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId;
    return __generator(this, function (_a) {
        ticketId = request.params.ticketId;
        return [2 /*return*/, ticket_1.TicketModel.findById(ticketId)
                .populate([
                { path: "id_event" },
                { path: "id_owner" },
                {
                    path: "id_deal",
                    populate: [{ path: "id_seller" }, { path: "id_buyer" }],
                },
            ])
                .then(function (ticket) {
                ticket
                    ? response.status(200).json(ticket)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getAllTickets = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ticket_1.TicketModel.find()
                .populate([
                { path: "id_event" },
                { path: "id_owner" },
                {
                    path: "id_deal",
                    populate: [{ path: "id_seller" }, { path: "id_buyer" }],
                },
            ])
                .then(function (tickets) {
                tickets
                    ? response.status(200).json(tickets)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getEventTicketsForSale = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_event;
    return __generator(this, function (_a) {
        id_event = request.params.eventId;
        return [2 /*return*/, ticket_1.TicketModel.find({ id_event: id_event, open_for_sale: true })
                .populate([
                { path: "id_event" },
                { path: "id_owner" },
                {
                    path: "id_deal",
                    populate: [{ path: "id_seller" }, { path: "id_buyer" }],
                },
            ])
                .then(function (tickets) {
                tickets
                    ? response.status(200).json(tickets)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getUserTickets = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id_owner, tickets, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id_owner = request.params.userId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, ticket_1.TicketModel.find({ id_owner: id_owner }).populate([
                        { path: "id_event" },
                        { path: "id_owner" },
                        {
                            path: "id_deal",
                            populate: [{ path: "id_seller" }, { path: "id_buyer" }],
                        },
                    ])];
            case 2:
                tickets = _a.sent();
                if (tickets) {
                    return [2 /*return*/, response.status(200).json(tickets)];
                }
                else {
                    return [2 /*return*/, response.status(200).json({ message: "not found" })];
                }
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, next(err_3)];
            case 4: return [2 /*return*/];
        }
    });
}); };
var updateTicket = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId;
    return __generator(this, function (_a) {
        ticketId = request.params.ticketId;
        return [2 /*return*/, ticket_1.TicketModel.findById(ticketId)
                .then(function (ticket) {
                if (ticket) {
                    ticket.set(request.body);
                    return ticket
                        .save()
                        .then(function (ticket) { return response.status(201).json(ticket); })
                        .catch(function (err) { return response.status(500).json(err); });
                }
                else {
                    response.status(404).json({ message: "not found" });
                }
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var deleteTicket = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ticketId;
    return __generator(this, function (_a) {
        ticketId = request.params.ticketId;
        return [2 /*return*/, ticket_1.TicketModel.findByIdAndDelete(ticketId)
                .then(function (ticket) {
                return ticket
                    ? response.status(201).json({ message: "deleted" })
                    : response.status(404).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
exports.default = {
    getTicket: getTicket,
    getAllTickets: getAllTickets,
    addTicket: addTicket,
    addFewTickets: addFewTickets,
    updateTicket: updateTicket,
    deleteTicket: deleteTicket,
    getEventTicketsForSale: getEventTicketsForSale,
    getUserTickets: getUserTickets,
};
