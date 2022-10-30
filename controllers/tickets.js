const Ticket = require("../models/Ticket");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const tickets = await Ticket.find({ user: req.user.id }).sort({ createdAt: "desc" });
      res.render("profile.ejs", { tickets: tickets, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    let tickets 
    try {
      if (req.user.role === 'Customer') {
        tickets = await Ticket.find({ user: req.user.id }).sort({ createdAt: "desc" }).populate('user').populate('assignedTech').lean();
      } else {
        tickets = await Ticket.find().sort({status: 1 }).populate('user').populate('assignedTech').lean();
      }
      res.render("feed.ejs", { tickets: tickets, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getTicket: async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id).populate('user').lean();
      res.render("ticket.ejs", { ticket: ticket, user: req.user });
    } catch (err) {
      console.error(err);
    }
  },
  getCreateTicket: async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id).populate('user').lean();
      await res.render("createTicket.ejs");
    } catch (err) {
      console.error(err);
    }
  },

  postCreateTicket: async (req, res, next) => {
    try {
      await Ticket.create({
        shortDesc: req.body.shortDesc,
        details: req.body.details,
        typeOfTicket: req.body.typeOfTicket,
        user: req.user.id,
      });
      res.redirect("/profile");
    } catch (err) {
      console.error(err);
    }
  },

  getUpdateTicket: async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id).populate('user').populate('assignedTech').lean();
      const techs = await User.find({ role: 'Tech' });
      
      await res.render("updateTicket.ejs", { ticket: ticket, user: req.user, techs: techs });
    } catch (err) {
      console.error(err);
    }
  },

  putUpdateTicket: async (req, res) => {
    try {
      const ticket = await Ticket.findById({ _id: req.params.id })
      ticket.status = req.body.status
      if (req.body.dueDate) {
        ticket.dueDate = req.body.dueDate
      }
      ticket.assignedTech = req.body.assignedTech
      if (req.body.techNotes) {
        ticket.techNotes.push({ body: req.body.techNotes, date: Date.now() })
      }
      ticket.save()
      res.redirect('/feed')
      console.log('Ticket updated')
    } catch(err) {
      console.error(err);
      res.render('error/500');
    }
  },

  deleteTicket: async (req, res) => {
    try {
      // Find ticket by id
      let ticket = await Ticket.findById({ _id: req.params.id });
      console.log(`Ticket: ${req.params.id}`)
      // Delete post from db
      await Ticket.remove({ _id: req.params.id });
      console.log("Deleted Ticket");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
