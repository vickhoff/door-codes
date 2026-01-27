import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: [validateEmail, "Please fill in a valid email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
},
    { timestamps: true }
);

//Validate email
function validateEmail(email) {
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    return emailRegex.test(email);
}

//Hash password before saving to database
userSchema.pre("save", async function () {
    const user = this;
    if (!user.isModified("password")) return;
    try {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
        throw error;
    }
});

//Compare password with hashed password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User