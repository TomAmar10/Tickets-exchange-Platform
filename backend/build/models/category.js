"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
var mongoose_1 = require("mongoose");
var CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Missing category name"],
        minLength: [2, "Category name too short"],
        maxLength: [20, "Category name too long"],
    },
    hebrew: {
        type: String,
        required: [true, "Missing category name"],
        minLength: [2, "Category name too short"],
        maxLength: [20, "Category name too long"],
    },
    image: {
        type: String,
    },
}, {
    versionKey: false,
});
exports.CategoryModel = (0, mongoose_1.model)("categories", // name of document collection
CategorySchema);
