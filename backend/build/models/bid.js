"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidModel = exports.StatusBid = void 0;
var mongoose_1 = require("mongoose");
var StatusBid;
(function (StatusBid) {
    StatusBid["PENDING"] = "PENDING";
    StatusBid["CONFIRMED"] = "CONFIRMED";
    StatusBid["DECLINED"] = "DECLINED";
})(StatusBid = exports.StatusBid || (exports.StatusBid = {}));
var BidSchema = new mongoose_1.Schema({
    id_bidder: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing bidder ID"],
        trim: true,
        ref: "users",
    },
    id_owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing owner ID"],
        trim: true,
        ref: "users",
    },
    tickets: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: [true, "Missing ticket ID"],
            trim: true,
            ref: "tickets",
        },
    ],
    bid_date: {
        type: Date,
        required: [true, "Missing bid date"],
        default: new Date(),
    },
    status: {
        type: String,
        required: [false, "Missing status"],
        default: StatusBid.PENDING,
    },
    amount: {
        type: Number,
        required: [true, "Missing amount"],
    },
}, {
    versionKey: false,
});
exports.BidModel = (0, mongoose_1.model)("bids", // name of document collection
BidSchema);
