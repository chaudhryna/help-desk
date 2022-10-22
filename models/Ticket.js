const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

const TicketSchema = new Schema({
  shortDesc: {
    type: String,
    required: true,
  },
  details: String,
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
  status: {
    type: String, 
    default: 'open',
    enum: ['open', 'assigned', 'under review', 'awaiting response', 'working on it', 'complete']
  },
  typeOfTicket: {
    type: String, 
    default: 'hardware',
    enum: ['hardware', 'software', 'account', 'password', 'other']
  },
  assignedTech: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
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
