import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model"; // Ensure the correct path to your User model

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "The user with this email already exists" });
    }

    // Create a new user
    user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });

    // Save the user
    await user.save();

    // Generate a JWT token
    const token = jwt.sign(
      {
        userID: user._id,
      },
      process.env.JWTSECRET as string,
      { expiresIn: "1d" }
    );

    // Send the response with the token in a cookie
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000, // 1 day
      })
      .json({ message: "User has been created", data: user });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
