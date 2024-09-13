import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(400).json({ message: "failure" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWTSECRET as string);
    req.userId = (decodedToken as JwtPayload).userID;
    next();
  } catch (error) {
    return res.status(400).json({ message: "failure" });
  }
};

export default verifyToken;
