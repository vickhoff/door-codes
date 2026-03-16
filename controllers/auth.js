import jwt from "jsonwebtoken";
import User from "../models/user.js";

//Register user
const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({
            username,
            email,
            password
        });
        await user.save();
        res.status(201).json({
            message: "Registration successful"
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: error.message
            });
        }
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({                                                       
                message: `${field} already exists`                                                
            });
        }
        return next(error);
    }
}

//Login with existing user
const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare password with saved password
        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        // Create token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });
        res.json({             
            username,
            email
        })
    } catch (error) {
        next(error);
    }
};

const logout = (req, res) => {
    res.clearCookie("token")
    res.json({message: "Logged out"})
}

export { register, login, logout };