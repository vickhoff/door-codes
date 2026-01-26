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
        return next(error);
    }
}

//Login with existing user
const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
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
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

export { register, login };