const Ticket = require("../models/Ticket");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const tickets = await Ticket.find({ user: req.user.id });
      res.render("profile.ejs", { tickets: tickets, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const tickets = await Ticket.find({ user: req.user.id }).sort({ createdAt: "desc" }).lean().populate("user");
      res.render("feed.ejs", { tickets: tickets });
    } catch (err) {
      console.log(err);
    }
  },
  getTicket: async (req, res) => {
    try {
      const ticket = await Ticket.findById(req.params.id);
      res.render("ticket.ejs", { ticket: ticket, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createTicket: async (req, res) => {
    try {
      await Ticket.create({
        shortDesc: req.body.shortDesc,
        description: req.body.description,
        user: req.user.id,
      });
      console.log("Ticket has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  // assignTicket: async (req, res) => {
  //   try {
  //     await Ticket.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/ticket/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  deleteTicket: async (req, res) => {
    try {
      // Find ticket by id
      let ticket = await Ticket.findById({ _id: req.params.id });
      
      // Delete post from db
      await Ticket.remove({ _id: req.params.id });
      console.log("Deleted Ticket");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
