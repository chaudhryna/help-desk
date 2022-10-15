const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/tickets");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Ticket Routes - simplified for now
router.get("/:id", ensureAuth, ticketsController.getTicket);
router.get('/createTicket', ensureAuth, ticketsController.getCreateTicket);
router.post("/createTicket", ensureAuth, ticketsController.postCreateTicket);
router.delete("/deleteTicket/:id", ticketsController.deleteTicket);

module.exports = router;
