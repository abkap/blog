const jwt = require("jsonwebtoken");
const { createJWTToken } = require("./basic_functions.js");
var {
  articleList,
  users,
  token,
  SECRET_KEY,
  idCount,
  emtptyArticle,
} = require("../model/model.js");

module.exports = {
  renderRoute: (req, res) => {
    res.render("index", { articles: articleList });
  },
  renderArticles: (req, res) => {
    res.render("thirdperson-read", {
      title: "something",
      content: "something",
    });
  },
  renderArticlesWithId: (req, res) => {
    for (var article of articleList) {
      if (article.id == req.params.id) {
        return res.render("thirdperson-read", {
          title: article.title,
          content: article.content,
        });
      }
    }
    return res.sendStatus(404);
  },
  getSuperuser: (req, res) => {
    // if logged in then redirect to /superuser/login page
    jwt.verify(req.cookies.token, SECRET_KEY, (err, deocode) => {
      if (!err) {
        return res.redirect("/superuser/login");
      }
      return res.render("login", { errorStatement: "" });
    });
  },
  postSuperuser: (req, res) => {
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
  },
  superuserLogin: (req, res) => {
    return res.render("firstperson", { articles: articleList });
  },
  superuserLogout: (req, res) => {
    res.clearCookie("token").redirect("/superuser");
  },
  createArticle: (req, res) => {
    res.render("create", { article: emtptyArticle, method: "POST" });
  },
  editArticle: (req, res) => {
    articleList.forEach((article) => {
      if (article.id == req.params.id) {
        // goto create page with pre existing conetnt
        res.render("create", { article: article, method: "PUT" });
      }
    });
  },
  postArticle: (req, res) => {
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
  },
  updateArticle: (req, res) => {
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
  },
  deleteArticle: (req, res) => {
    let id = Number(req.params.id);
    console.log("delete option for", req.params.id);
    articleList.forEach((article) => {
      if (article.id == id) {
        // remove
        articleList.splice(articleList.indexOf(article), 1);
      }
    });
    res.redirect("/superuser/login");
  },
};
