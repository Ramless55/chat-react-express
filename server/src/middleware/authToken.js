import jwt from "jsonwebtoken";
import httpStatus from "../helpers/httpStatus.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(' ')[1];

    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.data.id;

    next();
  } catch (error) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
};