import Item from "../models/item.js"

const createItem = async (req, res, next) => {
    try {
        const { name, address, code } = req.body;
        const data = await Item.create({ name, address, code });
        res.status(200).json(data);
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: error.message
            });
        }
        next(error);
    }
}

const getItems = async (req, res, next) => {
    try {
        const data = await Item.find();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const getItem = async (req, res, next) => {
    try {
        const data = await Item.findById(req.params.id);

        res.status(200).json(data);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                error: "Item wasn't found"
            });
        }
        next(error);
    }
}

const deleteItem = async (req, res, next) => {
    try {
        const deleteResult = await Item.findByIdAndDelete(req.params.id);

        if (!deleteResult) {
            const error = new Error("Item wasn't found.");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            message: "Item was deleted successfully"
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                error: "Item wasn't found"
            });
        }
        next(error);
    }
}

export { createItem, getItems, getItem, deleteItem }