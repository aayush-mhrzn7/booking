import { Router, Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
const router = Router();

router
  .route("/register")
  .post(
    [
      check("email", "email is required").isEmail(),
      check("firstName", "first name is required").isString(),
      check("lastName", "last name is required").isString(),
      check(
        "password",
        "password is required and should be greater than 6 charecter"
      ).isLength({ min: 6 }),
    ],
    async (req: Request, res: Response) => {
      const err = validationResult(req);
      if (err.isEmpty()) {
        return res.status(400).json({ message: err.array() });
      }
      try {
        const { email, password, firstName, lastName } = req.body;
        let user = await User.findOne({ email });
        if (user) {
          return res
            .status(400)
            .json({ message: "the user with this email already exist" });
        }
        user = await User.create({
          email,
          password,
          firstName,
          lastName,
        });
        await user.save();
        const token = jwt.sign(
          {
            userID: user._id,
          },
          process.env.JWTSECRET as string,
          { expiresIn: process.env.EXPIRYJWT as string }
        );

        return res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
          })
          .json({ message: "user has been created", data: user });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Server Error during registering User" });
      }
    }
  );
export default router;
