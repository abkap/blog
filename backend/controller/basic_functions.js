const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../model/model.js");
module.exports = {
  createJWTToken: (email, password) => {
    let token = jwt.sign({ email: email, password: password }, SECRET_KEY, {
      expiresIn: "15m",
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
};
