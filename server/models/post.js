import mongoose from "mongoose";

const postSchema = mongoose.Schema({
	title: { type: String, required: true },
	message: { type: String, required: true },
	name: { type: String },
	privacy: { type: String },
	creator: { type: String },
	tags: { type: [String] },
	selectedFile: { url: String, name: String, id: String },
	likes: {
		type: [String],
		default: [],
	},
	saves: {
		type: [String],
		default: [],
	},
	comments: { type: [{ userId: String, name: String, comment: String }], default: [] },
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const Post = mongoose.model("Post", postSchema);

export default Post;
