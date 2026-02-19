import InventoryItem, { ItInventoryItemKey } from "../../model/items/item.model.js";

const inventoryItemKeyService = async () => {
  try {
    // Fetch all keys from the InventoryItemKey model
    const inventoryItemKeys = await ItInventoryItemKey.find();

    // Create an array to hold the result
    const result = [];

    // Loop through each inventoryItemKey and fetch the corresponding total quantity from InventoryItem
    for (const itemKey of inventoryItemKeys) {
      // Find all InventoryItems with the same itemKey and sum their quantities
      const inventoryItems = await InventoryItem.find({ itemKey: itemKey._id });

      // Sum the quantities of all InventoryItems that reference the current itemKey
      const totalQuantity = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);

      // Add the item name and the total quantity to the result array
      result.push({
        _id : itemKey._id,
        key: itemKey.name,      // Name from the InventoryItemKey
        quantity: totalQuantity // Total quantity from all related InventoryItems
      });
    }

    return result; // Return the combined data
  } catch (error) {
    throw new Error('Error fetching inventory items: ' + error.message);
  }
};

const getFullInventoryItemHistoryById = async (itemKeyId) => {
  try {
    const itemKey = await ItInventoryItemKey.findOne({_id : itemKeyId});
    const inventoryItems = await InventoryItem.find({ itemKey: itemKeyId })
      .populate('itemKey') 
      .populate('usageHistory.inventoryId').populate('addedBy')
      .populate('usageHistory.usedBy'); 


    if (!inventoryItems || inventoryItems.length === 0 || inventoryItems[0].quantity === 0) {
      return { message: "No inventory purchased yet", data: [] }; 
    }
    const inventoryHistory = inventoryItems.map(item => {
      return {
        itemName: item?.itemKey?.name,
        itemDescription: item?.itemKey.description,
        quantityPurchased: item?.quantity,
        createdAt : item?.createdAt,
        addedBy : item?.addedBy?.name,
        pricePerItem: item?.price,
        usageHistory: item?.usageHistory.length > 0 ? item?.usageHistory.map(usage => {
          return {
            usedBy: usage.usedBy ? usage?.usedBy?.name : 'Unknown',
            usedIn: usage.inventoryId ? usage?.inventoryId?.tagNoCpu : 'Unknown',
            quantityUsed: usage?.qty,
            dateUsed: usage?.date,
          };
        }) : null 
      };
    });

    return { message: "Inventory history fetched successfully", data: inventoryHistory };
  } catch (error) {
    console.log(error);
    throw new Error('Unable to fetch inventory history');
  }
};



export { inventoryItemKeyService, getFullInventoryItemHistoryById };