import jwt from 'jsonwebtoken'
import { User } from "../models/user.models.js";
import bcrypt from 'bcryptjs'
import { ENV } from "../config/env.js";

export const Register = async (req, res) => {
    try {
        const { email, password, phone, fullName, country, role } = req.body;
        const user = await User.findOne({ email });

        if (role === "admin") {
            return res.status(403).json({ message: "Admin registration is not allowed" });
        }
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            fullName,
            phone,
            country,
            role: role || "tourist",
            accountStatus: role === "serviceProvider" ? "pending" : "active",

            password: hashedPassword
        });

        await newUser.save();
        const Token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            ENV.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return res.status(201).cookie("token", Token, { httpOnly: true, secure: true, maxAge: 1 * 24 * 60 * 60 * 1000 }).json({ message: "User registered successfully", token: Token });

    } catch (error) {
        console.error(error, "Error in Register controller");
        res.status(500).json({ message: error.message });
    }
}
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        if (user.accountStatus !== "active") {
            return res.status(403).json({
                success: false,
                message: "Account is not active"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const Token = jwt.sign(
            { userId: user._id, role: user.role },
            ENV.JWT_SECRET,
            { expiresIn: "1d" }
        );
        return res.status(200).cookie("token", Token, { httpOnly: true, secure: true, maxAge: 1 * 24 * 60 * 60 * 1000 })
        .json({ message: "Login successful", token: Token,success:true ,role:user.role });
    } catch (error) {
        console.error(error, "Error in Login controller");
        res.status(500).json({ message: error.message });
    }
}
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404)
            .json({ 
                success: false,
                message: "User not found" });
        }
        res.status(200).json({ user ,success:true});  
    } catch (error) {
        console.error(error, "Error in getUserProfile controller");
        res.status(500).json({ message: error.message });
    }
}
export const Logout = (req, res) => {
try {
    res.clearCookie("token", { httpOnly: true, secure: true });
    res.status(200).json({ message: "Logout successful" });
} catch (error) {
    console.error(error, "Error in Logout controller");
    res.status(500).json({ message: error.message });
}    
}