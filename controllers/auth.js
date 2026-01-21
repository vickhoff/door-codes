import jwt from "jsonwebtoken";
import User from "../models/user.js";

//Register user
const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Don't manually hash - your pre-save hook does this automatically!
        const user = new User({
            username,
            email,
            password  // Just pass plain password
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
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1h"  // Fixed: "1 hour" should be "1h"
        });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

export { register, login };