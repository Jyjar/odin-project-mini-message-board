const express = require("express");
const indexRouter = express.Router();

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
    },
];

indexRouter.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
});

indexRouter.get("/messages/:index", (req, res) => {
    const { index } = req.params;
    console.log(messages[index - 1])
    res.render("message", { message: messages[index - 1] });
});

module.exports = { messages, indexRouter };
