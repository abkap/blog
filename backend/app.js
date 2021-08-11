const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

// template engine and middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// constants
const SECRET_KEY = "mysercretkey@!";

// test content
const users = [
  {
    email: "admin@admin.com",
    password: "admin",
  },
  {
    email: "test@test.com",
    password: "test",
  },
];

var articleList = [
  {
    id: 1,
    title: "what is meant by this keyword ? ",
    description: "this keyword refers to current class",
    content: "there are many uses of this keyword and it varies on languages",
  },
  {
    id: 2,
    title: "deploying a server on gcp",
    description: "from begining to end on deploying a server on gcp",
    content: "first signup for gcp it is completely free for 3 months",
  },
];

// routes

app.get("/", (req, res) => {
  res.render("index", { articles: articleList.reverse() });
});

app.get("/articles", (req, res) => {
  res.render("thirdperson-read", { title: "something", content: "something" });
});
app.get("/articles/:id", (req, res) => {
  for (var article of articleList) {
    if (article.id == req.params.id) {
      return res.render("thirdperson-read", {
        title: article.title,
        content: article.content,
      });
    }
  }
  return res.sendStatus(404);
});

//everything exclusively for superuser
var token = "";
function createJWTToken(email, password) {
  let token = jwt.sign({ email: email, password: password }, SECRET_KEY, {
    expiresIn: "15s",
  });
  return token;
}
app.get("/superuser", (req, res) => {
  // if logged in then redirect to /superuser/login page
  jwt.verify(req.cookies.token, SECRET_KEY, (err, deocode) => {
    if (!err) {
      return res.redirect("/superuser/login");
    }
    return res.render("login", { errorStatement: "" });
  });
});

app.post("/superuser", (req, res) => {
  console.log("login page");

  console.log(req.body);
  for (user of users) {
    if (user.email == req.body.email && user.password == req.body.password) {
      //   authentication successfull , create  token , cookie and redirect to /superuser/login
      token = createJWTToken(req.body.email, req.body.password);
      return res.cookie("token", token).redirect("/superuser/login");
    }
  }
  console.log("this wont execute if logged in");
  return res.render("login", {
    errorStatement: "invalid email or password",
  });
});
// middleware everything that contains /superuser param will be authenticated
app.use("/superuser/:anything", (req, res, next) => {
  // check authorization
  jwt.verify(req.cookies.token, SECRET_KEY, (err, decode) => {
    if (err) {
      return res.status(403).send("you dont have access");
    } else {
      return next();
    }
  });
});

app.get("/superuser/login", (req, res) => {
  return res.render("firstperson", { articles: articleList.reverse() });
});

app.get("/superuser/logout", (req, res) => {
  res.clearCookie("token").redirect("/superuser");
});

// listen
app.listen(3000, () => {
  console.log("listening....");
});
