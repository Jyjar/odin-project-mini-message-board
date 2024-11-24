const express = require("express");
const indexRouter = express.Router();
const { getAllMessages } = require("../db/queries");

indexRouter.get("/", async (req, res) => {
    const messages = await getAllMessages();
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

indexRouter.get("/messages/:index", (req, res) => {
    const { index } = req.params;
    res.render("message", { message: messages[index - 1] });
});

module.exports = { indexRouter };
