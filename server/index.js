import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const PORT = 5001 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`server running on ${PORT}`);
});
