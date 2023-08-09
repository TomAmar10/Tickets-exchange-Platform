"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeModel = void 0;
var mongoose_1 = require("mongoose");
var SubscribeSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Missing email"],
    },
}, {
    versionKey: false,
});
exports.SubscribeModel = (0, mongoose_1.model)("subscribes", // name of document collection
SubscribeSchema);
