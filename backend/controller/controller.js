const jwt = require("jsonwebtoken");
const { createJWTToken } = require("./basic_functions.js");
const showdown = require("showdown");
var { articleList, users, token, SECRET_KEY } = require("../model/model.js");

var converter = new showdown.Converter();

module.exports = {
  renderRoute: (req, res) => {
    res.render("index", { articles: articleList });
  },

  renderArticlesWithId: (req, res) => {
    for (var article of articleList) {
      if (article.id == req.params.id) {
        return res.render("thirdperson-read", {
          title: article.title,
          contentHtml: article.contentHtml,
          date: article.date,
        });
      }
    }
    return res.status(404).render("notfound");
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
        var user = req.body.email.split("@")[0];
        var permission = "superuser";
        token = createJWTToken(user, permission);
        return res
          .cookie("token", token, {
            httpOnly: true,
            // secure: true,
            sameSite: true,
          })
          .redirect("/superuser/login");
      }
    }

    return res.render("login", {
      errorStatement: "invalid email or password",
    });
  },
  superuserLogin: (req, res) => {
    return res.render("firstperson", { articles: articleList });
  },
  superuserLogout: (req, res) => {
    res.clearCookie("token").redirect("/");
  },
  createArticle: (req, res) => {
    res.render("create", {
      id: "none",
      title: "",
      description: "",
      contentHtml: "",
      method: "POST",
    });
  },
  editArticle: (req, res) => {
    articleList.forEach((article) => {
      if (article.id == req.params.id) {
        // goto create page with pre existing conetnt
        res.render("create", {
          id: article.id,
          title: article.title,
          description: article.description,
          contentHtml: article.content,
          method: "PUT",
        });
      }
    });
  },
  postArticle: (req, res) => {
    console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;
    let content = req.body.content;
    let contentHtml = converter.makeHtml(content);
    let id = title.replace(/[\!\*\'\(\)\;\:\@\&\=\+\$\#\[\]\,\/\?\%]/g, "~");
    id = id.split(" ").join("-");

    console.log(content);
    articleList.push({
      id: id,
      title: title,
      description: description,
      content: content,
      contentHtml: contentHtml,
      date: new Date().toJSON().slice(0, 10),
    });
    console.log(articleList);

    res.redirect(`/articles/${id}`);
  },
  updateArticle: (req, res) => {
    // udpate data
    let title = req.body.title;
    let description = req.body.description;
    let content = req.body.content;
    let contentHtml = converter.makeHtml(content);
    let reqId = req.query.id;
    // console.log("put req : ", req.query);
    articleList.forEach((article) => {
      if (article.id == reqId) {
        // gotcha
        article.title = title;
        article.description = description;
        article.content = content;
        article.contentHtml = contentHtml;
      }
    });
    console.log(articleList);
    res.redirect(`/articles/${reqId}`);
  },
  deleteArticle: (req, res) => {
    let id = req.params.id;
    console.log("delete option for", req.params.id);
    articleList.forEach((article) => {
      if (article.id == id) {
        // remove
        articleList.splice(articleList.indexOf(article), 1);
      }
    });
    res.redirect("/superuser/login");
  },
  redirectToEdit: (req, res) => {
    res.redirect(`/superuser/edit/${req.params.id}`);
  },
};
