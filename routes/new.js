const express = require("express");
const newMessageRouter = express.Router();
const { insertMessage } = require("../db/queries");

newMessageRouter.get("/", (req, res) => res.render("new"));

newMessageRouter.post("/", async (req, res) => {
    const { text, user } = req.body; // Extract text and user from the form submission
    if (!text || !user) {
        return res.status(400).send("Both text and user fields are required!");
    }

    try {
        await insertMessage(text, user); // Insert the message into the database
        res.redirect("/"); // Redirect to the home page after adding the message
    } catch (error) {
        console.error("Error inserting message:", error);
        res.status(500).send("Error adding the message.");
    }
});

module.exports = {
    newMessageRouter: newMessageRouter
};
