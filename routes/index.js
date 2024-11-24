const express = require("express");
const indexRouter = express.Router();
const { getAllMessages, getMessageById } = require("../db/queries");

indexRouter.get("/", async (req, res) => {
    const messages = await getAllMessages();
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

indexRouter.get("/messages/:index", async (req, res) => {
    const { index } = req.params; // `index` here refers to the message ID
    const message = await getMessageById(index); // Fetch message by ID

    if (!message) {
        // If the message isn't found, return a 404 response
        return res.status(404).send("Message not found");
    }

    res.render("message", { message: message }); // Pass the message to the template
});
module.exports = { indexRouter };
