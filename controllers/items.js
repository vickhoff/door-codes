const createItem = async (req, res, next) => {
    try {
        const { name, address, code } = req.body;
        const newItem = { name, address, code };

        // Validation
        const requiredFields = ["name", "address", "code"];
        const missingFields = requiredFields.filter(field => !newItem[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: "Missing required fields",
                missingFields: missingFields
            });
        }

        const data = await itemService.addItem(newItem);
        res.status(201).json(data);  // 201 for created
    } catch (error) {
        next(error);
    }
}

const getItems = async (req, res, next) => {
    try {
        const data = await itemService.listItems();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

const deleteItem = async (req, res, next) => {
    try {
        await itemService.removeItem(req.params.id);
        res.status(200).json({
            message: "Item was deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}

export { createItem, getItems, deleteItem }