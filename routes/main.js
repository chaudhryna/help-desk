const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const ticketsController = require("../controllers/tickets");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, ticketsController.getProfile);
router.get('/ticket/createTicket', ensureAuth, ticketsController.getCreateTicket);
router.get("/feed", ensureAuth, ticketsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
