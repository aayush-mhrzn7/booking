import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();
router
  .route("/login")
  .post(
    [
      check("email", "Email is required").isEmail(),
      check("password", "password is required").isLength({ min: 6 }),
    ],
    async (req: Request, res: Response) => {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return res.status(400).json({ message: err.array() });
      }
      try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({
            message: "failiure to fetch the information from database",
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({
            message: "password doeesnt match with the existing password",
          });
        }
        const token = jwt.sign(
          {
            userID: user._id,
          },
          process.env.JWTSECRET as string,
          {
            expiresIn: process.env.EXPIRYJWT as string,
          }
        );
        return res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODEENV === "production",
            maxAge: 8640000,
          })
          .json({
            message: "the user is sucessfully logged in",
            userid: user._id,
          });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "something went wrong during login" });
      }
    }
  );
export default router;
