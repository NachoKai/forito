import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGODB_URI;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
	res.send("Hello Forito!");
});

mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		})
	)
	.catch(err => {
		console.error(err);
	});

mongoose.set("useFindAndModify", false);
