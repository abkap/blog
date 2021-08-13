const express = require("express");
const app = express();
const route = require("./routes/routes.js");

// template engine and middlewares
app.set("view engine", "ejs");
app.use("/", route);

// if neither of the case
app.use("/:anything", (req, res) => {
  res.render("notfound");
});
// listen
app.listen(3000, () => {
  console.log("listening....");
});
