import express from "express";
import escapeRegExp from "lodash";
import mongoose from "mongoose";

import Post from "../models/post.js";

const router = express.Router();

export const getAllPosts = async (_req, res) => {
	try {
		const posts = await Post.find().sort({ _id: -1 });

		res.status(200).json({
			data: posts,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPosts = async (req, res) => {
	const { page } = req.query;

	try {
		const LIMIT = 10;
		const startIndex = (Number(page) - 1) * LIMIT;
		const total = await Post.countDocuments({});
		const posts = await Post.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
		const privatePostsQuantity = posts.filter(post => post.privacy === "private").length;
		const postsWithPrivate = await Post.find()
			.sort({ _id: -1 })
			.limit(LIMIT + privatePostsQuantity)
			.skip(startIndex);

		res.status(200).json({
			data: postsWithPrivate,
			currentPage: Number(page),
			numberOfPages: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPostsBySearch = async (req, res) => {
	const { searchQuery, tags } = req.query;
	const safeSearchQuery = escapeRegExp(searchQuery);

	if (!searchQuery && !tags) return;

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
	const { title, message, creator, name, privacy, selectedFile, tags } = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post found.`);

	const updatedPost = {
		creator,
		name,
		privacy,
		title,
		message,
		tags,
		selectedFile,
		_id: id,
	};

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

	if (!post) return res.status(404).send(`Post not found.`);

	const index = post?.likes?.findIndex(id => id === String(req.userId));

	if (index === -1) {
		post?.likes?.push(req.userId);
	} else {
		post.likes = post?.likes.filter(id => id !== String(req.userId));
	}

	const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

	res.status(200).json(updatedPost);
};

export const savePost = async (req, res) => {
	const { id } = req.params;

	if (!req.userId) {
		return res.status(401).send("Unauthorized");
	}
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No post found.`);
	}

	const post = await Post.findById(id);

	if (!post) return res.status(404).send(`Post not found.`);
	const index = post?.saves?.findIndex(id => id === String(req.userId));

	if (index === -1) {
		post?.saves?.push(req.userId);
	} else {
		post.saves = post?.saves?.filter(id => id !== String(req.userId));
	}

	const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

	res.status(200).json(updatedPost);
};

export const commentPost = async (req, res) => {
	const { id } = req.params;
	const { value } = req.body;
	const post = await Post.findById(id);

	if (!post) return res.status(404).send(`Post not found.`);

	post?.comments?.push(value);
	const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

	res.status(200).json(updatedPost);
};

export const getPostsByCreator = async (req, res) => {
	const { id } = req.query;

	try {
		const posts = await Post.find({ creator: { $eq: id } });

		res.json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getSavedPosts = async (req, res) => {
	const { id } = req.query;

	try {
		const posts = await Post.find({ saves: { $eq: id } });

		res.json({ data: posts });
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export default router;
