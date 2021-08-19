const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const PostSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  date: String,
  content: String,
  contentHtml: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Posts = mongoose.model("posts", PostSchema);
const Users = mongoose.model("users", UserSchema);
const SECRET_KEY = "mysercretkey@!";

module.exports = {
  Posts,
  Users,
  SECRET_KEY,
};
