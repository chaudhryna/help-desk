const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  shortDesc: {
    type: String,
    required: true,
  },
  details: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String, enum: ["open", "assigned", "under review", "awaiting response", "working on it", "complete"],
  },
  typeOfTicket: {
    type: String, enum: ["hardware", "software", "account", "password reset", "other"]
  },
  assignedTech: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  techNotes: [
    { body: String, 
      date: Date }
  ],
  dueDate: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    immutible: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
