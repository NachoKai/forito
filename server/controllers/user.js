import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/user.js";

const isDev = process.env.NODE_ENV !== "production";
const envFile = isDev ? `.env.${process.env.NODE_ENV}` : ".env";

dotenv.config({ path: envFile });
const secret = process.env.SECRET;
const salt = process.env.SALT;

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email: { $eq: email } });

		if (!existingUser) {
			return res.status(404).json({ message: "User doesn't exist." });
		}

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid credentials." });
		}

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, {
			expiresIn: "12h",
		});

		res.status(200).json({ result: existingUser, token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Something went wrong." });
	}
};

export const signup = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName } = req.body;

	try {
		const existingUser = await User.findOne({ email: { $eq: email } });

		if (existingUser) {
			return res.status(400).json({ message: "User already exists." });
		}
		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords don't match." });
		}

		const hashedPassword = await bcrypt.hash(password, Number(salt));
		const result = await User.create({
			email,
			password: hashedPassword,
			name: lastName ? `${firstName} ${lastName}` : firstName,
		});
		const token = jwt.sign({ email: result.email, id: result._id }, secret, {
			expiresIn: "12h",
		});

		res.status(201).json({ result, token });
	} catch (err) {
		res.status(500).json({ message: "Something went wrong." });
		console.error(err);
	}
};

export const getUser = async (req, res) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id);

		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
