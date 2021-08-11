import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sanitize from "mongo-sanitize";

import User from "../models/user.js";

const isDev = process.env.NODE_ENV !== "production";
const envFile = isDev ? `.env.${process.env.NODE_ENV}` : ".env";

dotenv.config({ path: envFile });

const secret = process.env.SECRET;
const salt = process.env.SALT;

export const login = async (req, res) => {
	const email = sanitize(req.body.email);
	const password = sanitize(req.body.password);

	try {
		const existingUser = await User.findOne({ email });

		if (!existingUser) {
			return res.status(404).json({ message: "User doesn't exist." });
		}

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordCorrect) {
			return res.status(400).json({ message: "Invalid credentials." });
		}

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, {
			expiresIn: "1h",
		});

		res.status(200).json({ result: existingUser, token });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Something went wrong." });
	}
};

export const signup = async (req, res) => {
	const email = sanitize(req.body.email);
	const password = sanitize(req.body.password);
	const firstName = sanitize(req.body.firstName);
	const lastName = sanitize(req.body.lastName);
	const confirmPassword = sanitize(req.body.confirmPassword);

	try {
		const existingUser = await User.findOne({ email });

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
			name: `${firstName} ${lastName}`,
		});
		const token = jwt.sign({ email: result.email, id: result._id }, secret, {
			expiresIn: "1h",
		});

		res.status(201).json({ result, token });
	} catch (err) {
		res.status(500).json({ message: "Something went wrong." });
		console.error(err);
	}
};
