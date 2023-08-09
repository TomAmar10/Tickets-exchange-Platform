"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealModel = void 0;
var mongoose_1 = require("mongoose");
var DealSchema = new mongoose_1.Schema({
    tickets: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: [true, "Missing ticket ID"],
            trim: true,
            ref: "tickets",
        },
    ],
    id_seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing seller ID"],
        trim: true,
        ref: "users",
    },
    id_buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing buyer ID"],
        trim: true,
        ref: "users",
    },
    id_bid: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing bid ID"],
        trim: true,
        ref: "bids",
    },
    price: {
        type: Number,
        required: [true, "Price required"],
    },
    deal_date: {
        type: Date,
        required: [true, "Missing deal date"],
        default: new Date(),
    },
    is_seller_rated: {
        type: Boolean,
        default: false,
    },
    is_buyer_rated: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false,
});
exports.DealModel = (0, mongoose_1.model)("deals", // name of document collection
DealSchema);
