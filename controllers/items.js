import Item from "../models/item.js"

const compareUserId = async (itemUserId, currentUserId) => {
    
    //If UserId and items UserId doesnt match
    if (String(currentUserId) != String(itemUserId)) {
        const error = new Error("Not authorized.");
        error.status = 401;
        throw error;
    }
    return;
}

const createItem = async (req, res, next) => {
    try {
        const { 
            name, 
            address, 
            code
    } = req.body;

        const data = await Item.create({ 
            name, 
            address, 
            code, 
            createdBy: {
                userName: req.user.username,
                userId: req.user._id
            }
        });
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

//Get all your items
const getItems = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const data = await Item.find({userId: userId});
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const getItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);

            //Check if userID is the same as the items userId
            await compareUserId(item.createdBy.userId, req.user._id);

        res.status(200).json(item);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(404).json({
                error: "Item wasn't found"
            });
        }
        next(error);
    }
}

const updateItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            const error = new Error("Item wasn't found.");
            error.status = 404;
            throw error;
        }
        //Check if userID is the same as the items userId
        await compareUserId(item.createdBy.userId, req.user._id);

        const { name, address, code } = req.body;

        const updateData = await Item.findByIdAndUpdate(
            req.params.id, 
            { name, address, code },
            { new: true }
        );

        if (!updateData) {
            const error = new Error("Item wasn't found.");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            message: "Item was updated successfully",
            data: updateData
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

const deleteItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);

        await compareUserId(item.createdBy.userId, req.user._id);

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

export { createItem, getItems, getItem, updateItem, deleteItem }