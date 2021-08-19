const jwt = require("jsonwebtoken");
const { createJWTToken } = require("./basic_functions.js");
const showdown = require("showdown");

var { Users, SECRET_KEY, Posts } = require("../model/model.js");

var converter = new showdown.Converter();

module.exports = {
  renderRoute: async (req, res) => {
    // add error code
    await Posts.find((err, articleList) => {
      res.render("index", { articles: articleList.reverse() });
    });
  },

  renderArticlesWithId: async (req, res) => {
    await Posts.find((err, articleList) => {
      // add error code
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
    });
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
  postSuperuser: async (req, res) => {
    await Users.find((err, users) => {
      // add error code
      for (user of users) {
        if (
          user.email == req.body.email &&
          user.password == req.body.password
        ) {
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
    });
  },
  superuserLogin: async (req, res) => {
    // add error code
    await Posts.find((err, articleList) => {
      res.render("firstperson", { articles: articleList.reverse() });
    });
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
  editArticle: async (req, res) => {
    // add error code
    await Posts.find((err, articleList) => {
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
    });
  },
  postArticle: async (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let content = req.body.content;
    let date = new Date().toJSON().slice(0, 10).split("-").reverse().join("-");
    let contentHtml = converter.makeHtml(content);
    let id = title.replace(/[\!\*\'\(\)\;\:\@\&\=\+\$\#\[\]\,\/\?\%]/g, "~");
    var alredyExists = false;
    id = id.split(" ").join("-");
    await Posts.find((err, articleList) => {
      articleList.forEach((article) => {
        if (article.id == id) {
          res.send(
            "<h1>Id (title) alredy exists, please choose another title</h1>"
          );
          alredyExists = true;
        }
      });
    });

    if (!alredyExists) {
      // add error code
      new Posts({
        id: id,
        title: title,
        description: description,
        date: date,
        content: content,
        contentHtml: contentHtml,
      }).save();

      return res.redirect(`/articles/${id}`);
    }
  },
  updateArticle: async (req, res) => {
    // udpate data
    let title = req.body.title;
    let description = req.body.description;
    let content = req.body.content;
    let contentHtml = converter.makeHtml(content);
    let reqId = req.query.id;
    // add error code
    await Posts.updateOne(
      { id: reqId },
      {
        title: title,
        description: description,
        content: content,
        contentHtml: contentHtml,
      }
    );
    res.redirect(`/articles/${reqId}`);
  },
  deleteArticle: async (req, res) => {
    let id = req.params.id;
    // add error code
    await Posts.deleteOne({ id: id });
    res.redirect("/superuser/login");
  },
  redirectToEdit: (req, res) => {
    res.redirect(`/superuser/edit/${req.params.id}`);
  },
};
