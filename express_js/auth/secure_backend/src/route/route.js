import { homePageControler } from "../controlers/home.controlers.js";
import { createInventoryController, getCurrentUserInventoryControler, requestInventoryControler, returnInventoryControler, } from "../controlers/inventoryControler/inventery.controler.js";
import { addItemsToSystemFormController, addUsageHistoryControler, createItInventoryItemController, getInventoryKeyControler, getItInventoryItemByIdController, getItInventoryItemController, updateItInventoryItemByIdController } from "../controlers/inventoryControler/itemInventory.controler.js";
import { createItInventoryController, getItInventoryByIdController, getItInventoryController, getPcOptions, updateItInventoryControler } from "../controlers/inventoryControler/itInventory.controler.js";
import itInventoryGetControler, { createItInventoryKeyControler, itInventoryItemGetHistoryControler } from "../controlers/inventoryControler/itinventorykey.controler.js";
import { createUserSessionHandler, getSessionHandler, reIssueAccessTokenSessionHandler, updateSessionHandler } from "../controlers/session.controlers.js";
import { addCommentController, createTicketController, getMyTicketsByTypeController, getTicketByIdController, updateTicketController } from "../controlers/ticketControler/ticket.controler.js";
import userRegisterControler, { getAllUser, updateProfile, updateUserController, userManagementController } from "../controlers/user.controlers.js";
import requireUser, { isAdmin } from "../middleware/require.user.js";
import validateUser from "../middleware/validateUser.middleware.js";
import { inventoryCreateSchema, inventoryUpdateSchema } from "../schema/inventory.schema.js";
import { inventoryKeyUsageSchema } from "../schema/itemkey.schema.js";
import { inventoryItemCreateSchema, inventoryItemUsageSchema } from "../schema/items.schema.js";
import { itInventoryCreateSchema } from "../schema/itInventory.schema.js";
import { ticketCreateSchema, ticketUpdateSchema } from "../schema/ticket.schema.js";
import { userLoginSchema, userRegisterSchema } from "../schema/user.schema.js";

const routeFunc = (app) => {
    app.post('/login', validateUser(userLoginSchema), createUserSessionHandler);
    app.post('/register', validateUser(userRegisterSchema), userRegisterControler);
    app.post('/get-access-token', reIssueAccessTokenSessionHandler);
    app.get('/session', requireUser, getSessionHandler);
    app.post("/re-issue-access-token", reIssueAccessTokenSessionHandler);
    
    // User Management Controlers
    app.get('/get-all-user', requireUser, userManagementController);
    app.post("/logout", requireUser, updateSessionHandler);
    app.post("/update-user/:id", requireUser, updateUserController);
    app.put("/update-profile/", requireUser, updateProfile);
    
    app.post('/add-comment/:ticketId', requireUser, addCommentController);
    app.get('/home-page', requireUser, homePageControler);
    app.get('/get-all-user-for-ticket', requireUser, getAllUser);

    // Ticket Management
    app.post('/raise-ticket', requireUser, validateUser(ticketCreateSchema), createTicketController);
    app.post('/update-ticket-status/:id', requireUser, validateUser(ticketUpdateSchema), updateTicketController);
    app.get('/get-ticket/:id', requireUser, getTicketByIdController);
    app.get('/get-ticket-status', requireUser, getMyTicketsByTypeController);


    //IT inventory Management System
    app.post('/add-it-inventory', requireUser, validateUser(itInventoryCreateSchema), createItInventoryController);
    app.get('/get-it-inventory', requireUser, getItInventoryController);
    app.get('/get-it-inventory-key', requireUser, getInventoryKeyControler);
    app.get('/get-pc-options', requireUser, getPcOptions);
    app.get('/get-it-inventory-by-id/:id', requireUser, getItInventoryByIdController);
    app.put('/update-inventory/:id', requireUser, updateItInventoryControler);

    // It Inventory Items Management System
    app.post('/add-inventory-item', requireUser, validateUser(inventoryItemCreateSchema), createItInventoryItemController);
    app.get('/get-inventory-items', requireUser, itInventoryGetControler);
    app.get('/add-inventory-items', requireUser, addItemsToSystemFormController);
    app.get('/get-items-by-id/:id', requireUser, getItInventoryItemByIdController);
    app.get('/get-itemkey-history-detail/:id', requireUser, itInventoryItemGetHistoryControler);
    app.put('/update-items-by-id/:id', requireUser, updateItInventoryItemByIdController);
    app.put('/add-items-history/', requireUser, validateUser(inventoryItemUsageSchema), addUsageHistoryControler);
    app.post('/create-key-controler/', requireUser, validateUser(inventoryKeyUsageSchema), createItInventoryKeyControler);

    // Inventory Management System 
    app.post('/request-inventory/:inventoryId', requireUser, validateUser(inventoryUpdateSchema), requestInventoryControler);
    app.post('/return-inventory/:inventoryId', requireUser, validateUser(inventoryUpdateSchema), returnInventoryControler);
    app.get('/get-user-inventory/', requireUser, getCurrentUserInventoryControler);
    app.post('/add-inventory', requireUser, validateUser(inventoryCreateSchema), createInventoryController);
}

export default routeFunc;