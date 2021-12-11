import express from "express";
import escapeRegExp from "lodash";
import sanitize from "mongo-sanitize";
import mongoose from "mongoose";

import Post from "../models/post.js";

const router = express.Router();

export const getPosts = async (req, res) => {
	const { page } = req.query;

	try {
		const LIMIT = 5;
		const startIndex = (Number(page) - 1) * LIMIT;
		const total = await Post.countDocuments({});
		const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

		res.status(200).json({
			data: posts,
			currentPage: Number(page),
			numberOfPages: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// export const getAllPosts = async (req, res) => {
// 	try {
// 		const allPosts = await Post.find();

// 		res.status(200).json(allPosts);
// 	} catch (error) {
// 		res.status(404).json({ message: error.message });
// 	}
// };

export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;
	const safeSearchQuery = escapeRegExp(searchQuery);

	try {
		const title = new RegExp(safeSearchQuery, "i");
		const posts = await Post.find({
			$or: [{ title }, { tags: { $in: tags.split(",") } }],
		});

		res.status(200).json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPost = async (req, res) => {
	const { id } = req.params;

	try {
		const post = await Post.findById(id);

		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = req.body;

	const newPost = new Post({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	});

	try {
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const { id } = req.params;
	const { title, message, creator, name, selectedFile, tags } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post found.`);

	const updatedPost = { creator, name, title, message, tags, selectedFile, _id: id };
	// const cleanUpdatedPost = sanitize(updatedPost);

	await Post.findByIdAndUpdate(id, updatedPost, { new: true });

	res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No post found.`);
	}

	await Post.findByIdAndRemove(id);
	res.status(200).json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
	const { id } = req.params;

	if (!req.userId) {
		return res.status(401).send("Unauthorized");
	}
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No post found.`);
	}

	const post = await Post.findById(id);
	const index = post.likes.findIndex(id => id === String(req.userId));

	if (index === -1) {
		post.likes.push(req.userId);
	} else {
		post.likes = post.likes.filter(id => id !== String(req.userId));
	}

	const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

	res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
	const { id } = req.params;
	const { value } = req.body;

	// const comment = {
	// 	value,
	// 	creator: req.userId,
	// 	createdAt: new Date().toISOString(),
	// };
	const post = await Post.findById(id);

	post.comments.push(value);
	const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

	res.status(200).json(updatedPost);
};

export const getPostsByCreator = async (req, res) => {
	const { name } = req.query;
	// const cleanName = sanitize(name);

	try {
		const posts = await Post.find({ name });

		res.json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export default router;
