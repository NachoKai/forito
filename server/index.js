import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";

const isDev = process.env.NODE_ENV !== "production";
const envFile = isDev ? `.env.${process.env.NODE_ENV}` : ".env";
const limiter =
	!isDev &&
	rateLimit({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	});

const app = express();

app.get("env");

dotenv.config({ path: envFile });

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/forito";

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

if (!isDev) {
	app.use(limiter);
}

app.use(compression());
app.use(mongoSanitize());
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

mongoose
	.connect(CONNECTION_URL)
	.then(() =>
		app.listen(PORT, () => {
			console.info(`Forito listening on port ${PORT}`);
		})
	)
	.catch(err => {
		console.error(err);
	});
