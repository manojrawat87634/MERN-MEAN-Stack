import InventoryItem, { ItInventoryItemKey } from "../../model/items/item.model.js";
import { inventoryItemKeyService } from "../../service/inventoryItemService/inventoryItemKey.service.js";
import { createInventoryItem, getAllItemsService, getInventoryItemById, searchInventoryItems, updateInventoryItem } from "../../service/inventoryItemService/inventoryitems.service.js";
import { getAllItInventories } from "../../service/inventoryService/itInventory.service.js";

export const createItInventoryItemController = async (req, res) => {
  try {
    const itInventory = await createInventoryItem({ ...req.body, addedBy: req.user._id });
    return res.status(200).json({ success: true, message: "Inventory Created Successfully", data: itInventory });
  } catch (err) {
    
    return res.status(400).json({ success: false, message: "Error creating It Inventory", error: err.message });
  }
};

export const getInventoryKeyControler = async (req, res)=>{
  try{
    const itemKey = await ItInventoryItemKey.find({});
    res.json({
      itemKey
    }).status(200);
  }
  catch(err){
    res.status(400).json({ error : "Could Not found "})
  }
}
export const getItInventoryItemController = async (req, res) => {
  try {
    const query = req.query.q == undefined ? "" : req.query.q;
    const itInventory = await getAllItemsService();
    return res.status(200).json({ success: true, message: "Inventory Created Successfully", data: itInventory.items });
  } catch (err) {
    
    return res.status(400).json({ success: false, message: "Error creating It Inventory", error: err.message });
  }
};


export const getItInventoryItemByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const itInventory = await getInventoryItemById(id);

    return res.status(200).json({ success: true, message: "Items Fetched Successfully", data: itInventory });
  } catch (err) {
    
    return res.status(400).json({ success: false, message: "Error creating It Inventory", error: err.message });
  }
};

export const addItemsToSystemFormController = async (req, res) => {
  try {
    // query params
    const query = req.query.q?.trim() || "";
    const tagNoCpu = req.query.tagNoCpu || null;
    // search items
    const itInventory = await inventoryItemKeyService();
    // fetch system inventories (filter by tagNoCpu if provided)
    const systemInventory = await getAllItInventories(
      tagNoCpu ? { tagNoCpu } : {}
    );
    
    return res.status(200).json({
      success: true,
      message: "Inventory and systems fetched successfully",
      data: {
        items: itInventory,
        systems: systemInventory,
      },
    });
  } catch (err) {
    console.error("Error fetching inventory:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inventory and systems",
      error: err.message,
    });
  }
};



export const updateItInventoryItemByIdController = async (req, res) => {
  try {

    const id = req.params.id
    const itInventory = await updateInventoryItem(id, req.body);
    return res.status(200).json({ success: true, message: "Inventory Updated Successfully", data: itInventory });
  } catch (err) {
    
    return res.status(400).json({ success: false, message: "Error creating It Inventory", error: err.message });
  }
};


export async function addUsageHistoryControler(req, res) {
  try {
    const itemId = req.body.itemId;
    const item = await InventoryItem.findOne({ itemKey : itemId,   quantity: { $gt: 0 } });
    const inventoryId = req.body.systemId;
    const usedBy = req.user._id
    const qty = parseInt(req.body.quantity);
    if (!item) return res.json({ "error": "No Item Found In Database" }).status(400);
    if (item.quantity < qty) {
      return res.json({ "error": "No Item Found In Database" }).status(400);
    }
    // Use schema method to handle logic (assumes validation inside method or handled by schema)
    await item.addUsageHistory({ inventoryId, qty, usedBy });
    res.json({ "success": "Item Added to inventory Successfully!!" });
  }
  catch (err) {
    res.json({ "error": "Internal Server Error" }).status(400);
  }

}
