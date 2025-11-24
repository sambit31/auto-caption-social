import { UserModel } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registercontroller = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await UserModel.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

         const hashedPassword = bcrypt.hash(password, 10);

        const user = await UserModel.create({ username, password: hashedPassword });

        const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true });

        res.status(201).json({
            message: "User registered Successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
 

export const logincontroller = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid username or password" });
    
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid username or password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}



export const logoutcontroller = async (req, res) => { 
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });

}