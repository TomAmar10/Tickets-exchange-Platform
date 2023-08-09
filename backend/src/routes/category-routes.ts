import express from "express";
import controller from "../controller/category-controller";

const router = express.Router();

router.get("/single/:categoryId", controller.getCategory);
router.get("/all", controller.getAllCategories);
router.post("/single/add", controller.addCategory);
router.patch("/single/update/:categoryId", controller.updateCategory);
router.delete("/single/delete/:categoryId", controller.deleteCategory);

export default router;
