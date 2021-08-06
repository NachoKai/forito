import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
	try {
		const postMessages = await PostMessage.find();
		res.status(200).json(postMessages);
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
};

export const createPost = (req, res) => {
	const post = req.body;
	const newPost = new PostMessage(post);

	try {
		newPost.save();
		res.status(200).json(newPost);
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
};
