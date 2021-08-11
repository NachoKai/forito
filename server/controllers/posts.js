import express from "express";
import mongoose from "mongoose";
import sanitize from "mongo-sanitize";

import PostMessage from "../models/postMessage.js";

const router = express.Router();

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();

		res.status(200).json(postMessages);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const getPost = async (req, res) => {
	const id = sanitize(req.params.id);

	try {
		const post = await PostMessage.findById(id);

		res.status(200).json(post);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const createPost = async (req, res) => {
	const post = sanitize(req.body.post);

	const newPostMessage = new PostMessage({
		...post,
		creator: req.userId,
		createdAt: new Date().toISOString(),
	});

	try {
		await newPostMessage.save();
		res.status(201).json(newPostMessage);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

export const updatePost = async (req, res) => {
	const id = sanitize(req.params.id);
	const title = sanitize(req.body.title);
	const message = sanitize(req.body.message);
	const creator = sanitize(req.body.creator);
	const selectedFile = sanitize(req.body.selectedFile);
	const tags = sanitize(req.body.tags);

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

	await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

	res.json(updatedPost);
};

export const deletePost = async (req, res) => {
	const id = sanitize(req.params.id);

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send(`No post with id: ${id}`);

	await PostMessage.findByIdAndRemove(id);
	res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
	const id = sanitize(req.params.id);

	if (!req.userId) {
		return res.status(401).send("Unauthorized");
	}
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).send(`No post with id: ${id}`);
	}

	const post = await PostMessage.findById(id);
	const index = post.likes.findIndex(id => id === String(req.userId));

	if (index === -1) {
		post.likes.push(req.userId);
	} else {
		post.likes = post.likes.filter(id => id !== String(req.userId));
	}

	const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

	res.json(updatedPost);
};

export default router;
