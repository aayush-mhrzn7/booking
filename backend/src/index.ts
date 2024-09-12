import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL as string).then(() => {
  console.log("mongo db has been sucessfull connected");
});

//routes
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth";
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("server is now live in port 8000");
});
