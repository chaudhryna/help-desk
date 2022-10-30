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
    default: 'Open',
    enum: ['Open', 'Assigned', 'Under review', 'Awaiting response', 'Working on it', 'Complete']
  },
  typeOfTicket: {
    type: String,
    default: 'Hardware',
    enum: ['Hardware', 'Software', 'Account', 'Password', 'Other']
  },
  assignedTech: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
  techNotes: [
    {
      body: String,
      date: Date,
    }
  ],
  dueDate: {
    type: Date,
  },
}, 
  { timestamps: true });

module.exports = mongoose.model("Ticket", TicketSchema);
