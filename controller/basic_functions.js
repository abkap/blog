const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = require("../model/model.js");
module.exports = {
  createJWTToken: (user, permission) => {
    let token = jwt.sign({ user: user, permission: permission }, SECRET_KEY, {
      expiresIn: "24h",
    });
    return token;
  },
  authenticateUser: (req, res, next) => {
    // check authorization
    jwt.verify(req.cookies.token, SECRET_KEY, (err, decode) => {
      if (err) {
        console.log("err " + err);
        return res.redirect("/superuser");
      } else {
        return next();
      }
    });
  },

  checkUserPassword: async (inputPassword, dbPassword) => {
    let result = await bcrypt.compare(inputPassword, dbPassword);
    return new Promise((resolve, reject) => {
      resolve(result);
    });
  },
};
