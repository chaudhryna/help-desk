const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const ticketsController = require("../controllers/tickets");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Ticket Routes - simplified for now
router.get("/:id", ensureAuth, ticketsController.getTicket);

router.post("/createTicket", upload.single("file"), ticketsController.createTicket);

// router.put("/assignTicket/:id", ticketsController.assignTicket);

router.delete("/deleteTicket/:id", ticketsController.deleteTicket);

module.exports = router;
