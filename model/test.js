const mongoose = require("mongoose");
const { Posts } = require("./model.js");

async function getDetails() {
  Posts.find({ id: "hurrray" }, (err, article) => {
    if (article.length > 0) console.log(article);
  });
}

getDetails();
console.log("server running....");
