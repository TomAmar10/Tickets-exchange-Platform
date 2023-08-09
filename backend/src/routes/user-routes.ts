import express from "express";
import controller from "../controller/user-controller";

const router = express.Router();

router.get("/single/:userId", controller.getUser);
router.get("/all", controller.getAllUsers);
router.post("/single/add-rating/:id_user_to_rate", controller.addRating);
router.post("/single/add-favorite-event/:id_user", controller.addFavoriteEvent);
router.post("/single/remove-favorite-event/:id_user", controller.removeFavoriteEvent);

export default router;
