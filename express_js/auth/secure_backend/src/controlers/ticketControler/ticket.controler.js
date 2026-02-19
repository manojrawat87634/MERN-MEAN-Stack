import Ticket from "../../model/ticketModel/model.ticket.js";
import {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  addComment,
  assignTicket,
  resolveTicket,
  closeTicket,
  getTicketStats,
  getOverdueTickets
} from "../../service//ticketService/ticket.service.js";
import { getInventoryById } from "../../service/inventoryService/inventory.service.js";
import { getItInventoryById } from "../../service/inventoryService/itInventory.service.js";
import { findAllUserService, findUserService } from "../../service/user.service.js";
import { getIo } from "../../socket.js";


/* ---------- GET TICKETS ---------- */
export const getTicketsController = async (req, res) => {
  try {
    if (req.user.user_type == "technician") {
      const tickets = await Ticket.find({
        isActive: true,
        status: { $in: ["open", "in-progress"] }
      })
        .populate("requestedBy", "name email")
        .populate("assignedTo", "name email")
        .sort({ createdAt: -1 }); // Newest first
      return res.status(200).json({ success: true, data: tickets })
    }
    const data = await getTickets(req.query);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error loading tickets", error: err.message });
  }
};

/* ---------- GET SINGLE TICKET ---------- */
export const getTicketByIdController = async (req, res) => {
  try {
    const ticket = await getTicketById(req.params.id);
    if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });
   const allUser = await findAllUserService({ user_type: { $ne: "user" } });

    return res.status(200).json({ success: true, data: ticket, user: allUser });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error loading ticket", error: err.message });
  }
};

/* ---------- CREATE TICKET ---------- */
export const createTicketController = async (req, res) => {
  try {
    const ticket = await createTicket({ ...req.body, requestedBy: req.user._id });
    const io = getIo();
    io.emit("ticket_raised", {});
      setImmediate(async () => {
      try {
        const users = await findAllUserService({ user_type: "technician" });

        for (const user of users) {
          if (user.user_token) {
            await notificationService(user.user_token); // or non-await if fire-and-forget
          }
        }
      } catch (notifyErr) {
      }
    });
    return res.status(201).json({ success: true, message: "Ticket created successfully", data: ticket });
  } catch (err) {    
    return res.status(500).json({ success: false, message: "Error creating ticket", error: err.message });
  }
};

/* ---------- UPDATE TICKET ---------- */
export const updateTicketController = async (req, res) => {
  try {
    const ticket = await updateTicket(req.params.id, req.body);
    const io = getIo();
    io.emit("update_ticket_status", {

    });
    return res.status(200).json({ success: true, message: "Ticket updated successfully", data: ticket });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error updating ticket", error: err.message });
  }
};

/* ---------- DELETE TICKET ---------- */
export const deleteTicketController = async (req, res) => {
  try {
    const ticket = await deleteTicket(req.params.id);
    return res.status(200).json({ success: true, message: "Ticket deleted successfully", data: ticket });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error deleting ticket", error: err.message });
  }
};

/* ---------- ADD COMMENT ---------- */
export const addCommentController = async (req, res) => {
  try {
    const { content, isInternal } = req.body;
    const userId = req.user._id;
    const ticket = await Ticket.findOne({ _id: req.params.ticketId });
    ticket.addComment(req.user._id, content);
    const io = getIo();
    io.emit("add_comment", {

    })
    // const ticket = await addComment(req.params.ticketId, userId, content, isInternal);
    return res.status(200).json({ success: true, message: "Comment added successfully", data: ticket });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error adding comment", error: err.message });
  }
};

/* ---------- ASSIGN TICKET ---------- */
export const assignTicketController = async (req, res) => {
  try {
    const { userId } = req.body;
    const ticket = await assignTicket(req.params.id, userId);
    return res.status(200).json({ success: true, message: "Ticket assigned successfully", data: ticket });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error assigning ticket", error: err.message });
  }
};

/* ---------- RESOLVE TICKET ---------- */
export const resolveTicketController = async (req, res) => {
  try {
    const { resolution } = req.body;
    const ticket = await resolveTicket(req.params.id, resolution);
    return res.status(200).json({ success: true, message: "Ticket resolved successfully", data: ticket });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error resolving ticket", error: err.message });
  }
};

/* ---------- CLOSE TICKET ---------- */
export const closeTicketController = async (req, res) => {
  try {
    const ticket = await closeTicket(req.params.id);
    return res.status(200).json({ success: true, message: "Ticket closed successfully", data: ticket });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error closing ticket", error: err.message });
  }
};

/* ---------- META ---------- */
export const getTicketStatsController = async (req, res) => {
  try {
    const stats = await getTicketStats();
    return res.status(200).json({ success: true, data: stats });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error fetching ticket stats", error: err.message });
  }
};

export const getOverdueTicketsController = async (req, res) => {
  try {
    const tickets = await getOverdueTickets();
    return res.status(200).json({ success: true, data: tickets });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error fetching overdue tickets", error: err.message });
  }
};

export const getTicketTrendsController = async (req, res) => {
  try {
    const { period } = req.query;
    const trends = await getTicketTrends(period ? parseInt(period) : 30);
    return res.status(200).json({ success: true, data: trends });
  } catch (err) {
    
    return res.status(500).json({ success: false, message: "Error fetching ticket trends", error: err.message });
  }
};

export const getMyTicketsByTypeController = async (req, res) => {
  try {
    const { status, ...rest } = req.query;

    const filter = {
      ...rest,
      isActive: true,
    };
    if (req.user?.user_type === 'user') {
      filter.requestedBy = req.user._id;
    }
    if (status === 'pending') {
      filter.status = {
        $in: ['open', 'in-progress']
      };
    } else if (status) {
      // If not pending, keep status as-is
      filter.status = status;
    }

    const tickets = await Ticket.find(filter)
      .populate("requestedBy", "name email")
      .populate("assignedTo", "name email").populate("pc", "tagNoCpu")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: tickets });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
      error: err.message,
    });
  }
};
