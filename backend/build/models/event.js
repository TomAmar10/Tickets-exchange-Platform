"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
var mongoose_1 = require("mongoose");
var EventSchema = new mongoose_1.Schema({
    id_category: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Missing category ID"],
        trim: true,
        ref: "categories",
    },
    location: {
        type: String,
        required: [true, "Missing location"],
        minLength: [2, "Location too short"],
        maxLength: [40, "Location too long"],
    },
    date: {
        type: Date,
        required: [true, "Missing date"],
    },
    event_name: {
        type: String,
        required: [true, "Missing event name"],
        minLength: [2, "Event name too short"],
        maxLength: [40, "Event name too long"],
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minLength: [2, "Description too short"],
        maxLength: [70, "Description too long"],
    },
    time_create: {
        type: Date,
        required: [true, "Missing creation time"],
        default: new Date(),
    },
    image: {
        type: String,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    tags: [
        {
            type: String,
        },
    ],
}, {
    versionKey: false,
});
exports.EventModel = (0, mongoose_1.model)("events", // name of document collection
EventSchema);
