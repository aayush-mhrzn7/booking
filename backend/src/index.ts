import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: process.env.FRONTENDURL as string, credentials: true }));

mongoose
  .connect(process.env.MONGODB_URL as string)
  .then(() => {
    app.listen(8000, () => {
      console.log("server is now live in port 8000");
    });
    console.log("mongo db has been sucessfull connected");
  })
  .catch((err) => console.log("error", err));

//routes
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth";
import { cookie } from "express-validator";

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
