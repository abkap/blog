const express = require("express");
const favicon = require("serve-favicon");
const app = express();
const route = require("./routes/routes.js");
const PORT = 3000;

// template engine and middlewares
app.use(favicon("./public/favicon/favicon.ico"));
app.set("view engine", "ejs");
app.use("/", route);

// if neither of the case
app.use("/:anything", (req, res) => {
  res.render("notfound");
});
// listen
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
