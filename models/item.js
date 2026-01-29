import mongoose from "mongoose";
import bcrypt from "bcrypt";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    address: {
        type: String,
        required: [true, "Address is required"]
    },
    code: {
        type: String,
        required: [true, "Code is required"]
    },
    createdBy: {
        userId: {
            type: "ObjectId",
            ref: "User"        },
        userName: {
            type: "String",
            ref: "User"        }
    }
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);

export default Item;