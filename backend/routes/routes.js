const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const controller = require("../controller/controller.js");
const router = express.Router();
const basicFunctions = require("../controller/basic_functions.js");

router.use(express.static("public"));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(methodOverride("_method"));
// middleware everything that contains /superuser/something  will be authenticated
router.use("/superuser/:anything", basicFunctions.authenticateUser);

// routes

router.get("/", controller.renderRoute);

router.get("/articles/:id", controller.renderArticlesWithId);
router.get("/articles/:id/edit", controller.redirectToEdit);

//everything exclusively for superuser

router.get("/superuser", controller.getSuperuser);

router.post("/superuser", controller.postSuperuser);

router.get("/superuser/login", controller.superuserLogin);

router.get("/superuser/logout", controller.superuserLogout);

router.get("/superuser/create", controller.createArticle);

router.get("/superuser/edit/:id", controller.editArticle);

router.post("/superuser/create", controller.postArticle);

router.put("/superuser/create", controller.updateArticle);

router.delete("/superuser/:id/delete", controller.deleteArticle);

module.exports = router;
