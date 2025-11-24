import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.models.js";

export const authMiddleware = async function (req, res, next) {

    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "Unauthorized" });
        
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}