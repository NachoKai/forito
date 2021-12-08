import express from "express";

import {
	commentPost,
	createPost,
	deletePost,
	// getAllPosts,
	getPost,
	getPosts,
	getPostsByCreator,
	getPostsBySearch,
	likePost,
	updatePost,
} from "../controllers/posts.js";
// import { savePost } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/search", getPostsBySearch);
router.get("/creator", getPostsByCreator);
router.get("/", getPosts);
// router.get("/all", getAllPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
// router.patch("/:id/savePost", auth, savePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
