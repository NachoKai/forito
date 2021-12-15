import express from "express";

import { getUser, login, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/:id", getUser);

export default router;
