import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./src/db/db.js";
import authrouter from "./src/routes/auth.routes.js";
import postrouter from "./src/routes/post.routes.js";
import cookieParser from "cookie-parser";


dotenv.config();

ConnectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authrouter);
app.use("/api/posts", postrouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
