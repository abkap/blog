const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const app = express();

// template engine and middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// middleware everything that contains /superuser/something  will be authenticated
app.use("/superuser/:anything", authenticateUser);
app.use(methodOverride("_method"));
// constants and variables
const SECRET_KEY = "mysercretkey@!";
var token = "";

// functions

function createJWTToken(email, password) {
  let token = jwt.sign({ email: email, password: password }, SECRET_KEY, {
    expiresIn: "15m",
  });
  return token;
}
function authenticateUser(req, res, next) {
  // check authorization
  jwt.verify(req.cookies.token, SECRET_KEY, (err, decode) => {
    if (err) {
      console.log("err " + err);
      return res.redirect("/superuser");
    } else {
      return next();
    }
  });
}

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
  res.render("index", { articles: articleList });
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
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: true,
        })
        .redirect("/superuser/login");
    }
  }
  console.log("this wont execute if logged in");
  return res.render("login", {
    errorStatement: "invalid email or password",
  });
});

app.get("/superuser/login", (req, res) => {
  return res.render("firstperson", { articles: articleList });
});

app.get("/superuser/logout", (req, res) => {
  res.clearCookie("token").redirect("/superuser");
});

app.get("/superuser/create", (req, res) => {
  res.render("create", { article: emtptyArticle, method: "POST" });
});

var idCount = 2; // since 2 items are alredy there
var emtptyArticle = {
  id: "none",
  title: "",
  description: "",
  content: "",
};
app.get("/superuser/edit/:id", (req, res) => {
  articleList.forEach((article) => {
    if (article.id == req.params.id) {
      // goto create page with pre existing conetnt
      res.render("create", { article: article, method: "PUT" });
    }
  });
});

app.post("/superuser/create", (req, res) => {
  console.log(req.body);
  let title = req.body.title;
  let description = req.body.description;
  let content = req.body.content;

  articleList.push({
    id: ++idCount,
    title: title,
    description: description,
    content: content,
  });

  res.redirect("/superuser");
});
// to update value
app.put("/superuser/create", (req, res) => {
  // udpate data
  let title = req.body.title;
  let description = req.body.description;
  let content = req.body.content;
  let reqId = Number(req.query.id);
  // console.log("put req : ", req.query);
  articleList.forEach((article) => {
    if (article.id == reqId) {
      // gotcha
      article.title = title;
      article.description = description;
      article.content = content;
    }
  });

  res.redirect("/superuser");
});

app.delete("/superuser/:id/delete", (req, res) => {
  let id = Number(req.params.id);
  console.log("delete option for", req.params.id);
  articleList.forEach((article) => {
    if (article.id == id) {
      // remove
      articleList.splice(articleList.indexOf(article), 1);
    }
  });
  res.redirect("/superuser/login");
});

// listen
app.listen(3000, () => {
  console.log("listening....");
});
