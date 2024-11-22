const express = require("express");
const newMessageRouter = express.Router();
const { messages } = require("./index");

newMessageRouter.get("/", (req, res) => res.render("new"));

newMessageRouter.post("/", (req, res) => {
    messages.push({
        text: req.body.message,
        user: req.body.name,
        added: new Date(),
    });
    res.redirect("/");
});

module.exports = { newMessageRouter };
