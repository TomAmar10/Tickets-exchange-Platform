"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_controller_1 = __importDefault(require("../controller/category-controller"));
var router = express_1.default.Router();
router.get("/single/:categoryId", category_controller_1.default.getCategory);
router.get("/all", category_controller_1.default.getAllCategories);
router.post("/single/add", category_controller_1.default.addCategory);
router.patch("/single/update/:categoryId", category_controller_1.default.updateCategory);
router.delete("/single/delete/:categoryId", category_controller_1.default.deleteCategory);
exports.default = router;
