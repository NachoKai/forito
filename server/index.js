import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

app.get("env");

const isDev = process.env.NODE_ENV !== "production";
const envFile = isDev ? `.env.${process.env.NODE_ENV}` : ".env";

dotenv.config({ path: envFile });

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGODB_URI;

app.use(express.json({ limit: "", extended: true }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(cors());
app.use(mongoSanitize());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
	res.send("Hello Forito!");
});

mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Forito listening on port ${PORT}`);
		})
	)
	.catch(err => {
		console.error(err);
	});

mongoose.set("useFindAndModify", false);
