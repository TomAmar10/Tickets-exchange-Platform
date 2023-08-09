"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
var mongoose_1 = require("mongoose");
var TicketsSchema = new mongoose_1.Schema({
    id_event: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing event ID"],
        trim: true,
        ref: "events",
    },
    id_owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing owner (user) ID"],
        trim: true,
        ref: "users",
    },
    id_deal: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "deals",
    },
    type: {
        type: String,
        required: [true, "Missing event type"],
        maxLength: [20, "Event type is not valid"],
    },
    area: {
        type: String,
        required: [true, "Missing area number"],
        min: [0, "Area number is not valid"],
    },
    row: {
        type: String,
        required: [true, "Missing row number"],
        min: [0, "Row number is not valid"],
    },
    seat: {
        type: Number,
        required: [true, "Missing seat number"],
        min: [0, "Seat number is not valid"],
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price is too low"],
    },
    currency: {
        type: String,
        required: [true, "Missing currency"],
        default: "USD",
    },
    image: {
        type: String,
        required: [true, "Missing image"],
    },
    time_create: {
        type: Date,
        required: [true, "Missing creation time"],
        default: new Date(),
    },
    open_for_sale: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
});
exports.TicketModel = (0, mongoose_1.model)("tickets", // name of document collection
TicketsSchema);
