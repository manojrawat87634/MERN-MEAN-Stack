import ItInventoryModel from "../../model/inventory/itInventory.model.js";
import Ticket from "../../model/ticketModel/model.ticket.js";
import { createItInventory, getAllItInventories, getItInventoryById, updateItInventoryService } from "../../service/inventoryService/itInventory.service.js";

export const createItInventoryController = async (req, res) => {
  try {
    const itInventory = await createItInventory({ ...req.body, requestedBy: req.user._id });
    return res.status(200).json({ success: true, message: "Inventory Created Successfully", data: itInventory });
  } catch (err) {
    
    return res.status(400).json({ success: false, message: "Error creating It Inventory", error: err.message });
  }
};

export const getPcOptions = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const skip = parseInt(req.query.skip) || 0;
    const search = req.query.search?.trim() || "";

    const query = {
      status: { $ne: "retired" },
    };

    if (search) {
      query.$or = [
        { tagNoCpu: { $regex: search, $options: "i" } }
      ];
    }

    const pcs = await ItInventoryModel.find(query)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const blockedPcIds = await Ticket.distinct("pc", {
      status: { $in: ['open', 'in-progress'] },
      pc: { $ne: null }
    });

    const blockedPcIdStrings = blockedPcIds.map(id => id.toString());

    const result = pcs.map((pc) => ({
      _id: pc._id,
      tag: pc.tagNoCpu,
      displayName: `${pc.tagNoCpu} - ${pc.manufactureBy} (${pc.ram}/${pc.storage})`,
      disabled: blockedPcIdStrings.includes(pc._id.toString()),
    }));

    return res.json({ success: true, data: result });
  } catch (error) {
    console.error("Error fetching PCs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch PCs." });
  }
};


export const getItInventoryController = async (req, res) => {
  try {
    // If you want filtering, use req.query
    const filters = { ...req.query };
    
    const itInventory = await getAllItInventories(filters);

    return res.status(200).json({ success: true, data: itInventory });
  } catch (err) {
    
    return res.status(500).json({
      success: false,
      message: "Error fetching IT inventories",
      error: err.message,
    });
  }
};

export const updateItInventoryControler = async (req, res) => {
  try {
    const itInventory = await updateItInventoryService(req.params.id, req.body);
    return res.status(200).json({ success: true, data: itInventory });
  } catch (err) {
    // 
    return res.status(500).json({
      success: false,
      message: "Error fetching IT inventories",
      error: err.message,
    });
  }
}

export const getItInventoryByIdController = async (req, res) => {
  try {
    const itInventory = await getItInventoryById(req.params.id);
    return res.status(200).json({ success: true, data: itInventory });
  } catch (err) {
    
    return res.status(500).json({
      success: false,
      message: "Error fetching IT inventories",
      error: err.message,
    });
  }
};