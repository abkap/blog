const jwt = require("jsonwebtoken");
const { createJWTToken } = require("./basic_functions.js");
const showdown = require("showdown");

var { Users, SECRET_KEY, Posts } = require("../model/model.js");

var converter = new showdown.Converter();

module.exports = {
  renderRoute: async (req, res) => {
    // add error code
    try {
      await Posts.find((err, articleList) => {
        res.render("index", { articles: articleList.reverse() });
      });
    } catch (e) {
      console.log(e);
      res.render("notfound");
    }
  },

  renderArticlesWithId: async (req, res) => {
    try {
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
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
  getSuperuser: (req, res) => {
    // if logged in then redirect to /superuser/login page
    try {
      jwt.verify(req.cookies.token, SECRET_KEY, (err, deocode) => {
        if (!err) {
          return res.redirect("/superuser/login");
        }
        return res.render("login", { errorStatement: "" });
      });
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
  postSuperuser: async (req, res) => {
    try {
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
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
  superuserLogin: async (req, res) => {
    // add error code
    try {
      await Posts.find((err, articleList) => {
        res.render("firstperson", { articles: articleList.reverse() });
      });
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
  superuserLogout: (req, res) => {
    try {
      res.clearCookie("token").redirect("/");
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
  createArticle: (req, res) => {
    try {
      res.render("create", {
        id: "none",
        title: "",
        description: "",
        contentHtml: "",
        method: "POST",
      });
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
  editArticle: async (req, res) => {
    // add error code
    try {
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
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
  postArticle: async (req, res) => {
    try {
      let title = req.body.title;
      let description = req.body.description;
      let content = req.body.content;
      let date = new Date()
        .toJSON()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("-");
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
        await new Posts({
          id: id,
          title: title,
          description: description,
          date: date,
          content: content,
          contentHtml: contentHtml,
        }).save();

        return res.redirect(`/articles/${id}`);
      }
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
  updateArticle: async (req, res) => {
    try {
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
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
  deleteArticle: async (req, res) => {
    try {
      let id = req.params.id;
      // add error code
      await Posts.deleteOne({ id: id });
      res.redirect("/superuser/login");
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
  redirectToEdit: (req, res) => {
    try {
      res.redirect(`/superuser/edit/${req.params.id}`);
    } catch (err) {
      console.log(err);
      res.render("notfound");
    }
  },
};
