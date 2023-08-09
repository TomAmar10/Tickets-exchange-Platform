"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleUserModel = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: [true, "Missing name"],
        minLength: [2, "Name too short"],
        maxLength: [20, "Name too long"],
    },
    last_name: {
        type: String,
        required: [true, "Missing last name"],
        minLength: [2, "Last name too short"],
        maxLength: [20, "Last name too long"],
    },
    email: {
        type: String,
        required: [true, "Missing email"],
        minLength: [6, "Email too short"],
        maxLength: [50, "Email too long"],
        trim: true,
        unique: true,
    },
    googleId: {
        type: String,
        required: [true, "Missing google ID"],
        unique: true,
    },
    time_create: {
        type: Date,
        required: [true, "Missing creation time"],
        default: new Date(),
    },
    birth_date: Date,
    image: {
        type: String,
    },
    ratings: [
        {
            star: Number,
            comment: String,
            id_posted: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "users",
            },
            time_create: {
                type: Date,
                default: new Date(),
            },
        },
    ],
    total_rating: {
        type: String,
        default: 0,
    },
    role: {
        type: Number,
        required: [true, "Missing role"],
        default: 2,
        min: 1,
        max: 2,
    },
}, {
    versionKey: false,
});
exports.GoogleUserModel = (0, mongoose_1.model)("google", // name of document collection
UserSchema);
