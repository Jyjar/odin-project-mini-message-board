const express = require("express");
const newMessageRouter = express.Router();
const { insertMessage } = require("../db/queries");

newMessageRouter.get("/", (req, res) => res.render("new"));

newMessageRouter.post("/", async (req, res) => {
    const { message } = req.body;
    if (message && message.trim()) {
        await insertMessage(message.trim());
    }
    res.redirect("/");
});

module.exports = {
    newMessageRouter: router
};
