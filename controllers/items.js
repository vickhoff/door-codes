import mongoose from "mongoose";
import Item from "../models/item.js"

const listItems = async () => {
    const collection = db.collection("items");
    const data = await collection.find().toArray();
    return data;
}

const addItem = async (item) => {
    const data = await Item.create(item);
    return data;
}

const removeItem = async (id) => {
    const deleteResult = await Item.findByIdAndDelete(id);

    if (!deleteResult) {
        const error = new Error("Item wasn't found.");
        error.status = 404;
        throw error;
    }

    return deleteResult;
}

export { listItems, addItem, removeItem };