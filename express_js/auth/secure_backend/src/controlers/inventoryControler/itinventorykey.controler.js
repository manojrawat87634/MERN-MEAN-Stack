import { ItInventoryItemKey } from "../../model/items/item.model.js";
import { getFullInventoryItemHistoryById, inventoryItemKeyService } from "../../service/inventoryItemService/inventoryItemKey.service.js";


const itInventoryGetControler = async (req, res) => {
    try {
        const inventoryItemKey = await inventoryItemKeyService();
        
        return res.json({
            data: inventoryItemKey
        }).status(200);
    }
    catch (err) {
        res.json({ error: "Some Error Occured" }).status(400);
    }
}
export const createItInventoryKeyControler = async (req, res) => {
    try {
        const inventoryItemKey = await ItInventoryItemKey.create(req.body);
        return res.json({
            data: inventoryItemKey
        }).status(200);
    }
    catch (err) {
        res.json({ error: "Some Error Occured" }).status(400);
    }
}



export const itInventoryItemGetHistoryControler = async (req, res) => {
    try {
        const result = await getFullInventoryItemHistoryById(req.params.id);
        console.log(result);
        return res.json( result ).status(200);
    }
    catch (err) {
        console.log(err);
        res.json({ error: "Some Error Occured" }).status(400);
    }
}




export default itInventoryGetControler;