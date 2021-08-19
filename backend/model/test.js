const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});

db.on("open", () => {
  console.log("mongodb connected successfully");

  const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
  });

  const Posts = mongoose.model("Posts", PostSchema);

  new Posts({
    title: "hey title",
    description: "hhey desc",
    content: "hey content",
  }).save((err, item) => {
    if (err) console.log(err);
  });

  Posts.find((err, item) => {
    if (err) console.log(err);
    else console.log(item);
  });

  //   end
});

console.log("server running....");
