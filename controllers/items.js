import { addItem, listItems, removeItem } from "../services/items.js"

const createItem = async (req, res, next) => {
    try {
        const { name, address, code } = req.body;
        const data = await addItem({ name, address, code });
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
}

const getItems = async (req, res, next) => {
    try {
        const data = await listItems();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const deleteItem = async (req, res, next) => {
    try {
        await removeItem(req.params.id);
        res.status(200).json({
            message: "Item was deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}

export { createItem, getItems, deleteItem }