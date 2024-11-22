const express = require("express");
const app = express();
const path = require("node:path");
const { messages, indexRouter } = require("./routes/index");
const { newMessageRouter } = require("./routes/new");
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); // Makes form work

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", indexRouter);
app.use("/new", newMessageRouter);

app.get("/new", (req, res) => {
    res.render("new");
});

app.listen(PORT, () => {
    console.log(`My first Express app - listening on port ${PORT}!`);
});
