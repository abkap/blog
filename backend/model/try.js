const mongoose = require("mongoose");
const { Posts, UserSchema } = require("./model.js");

const Users = mongoose.model("Users", UserSchema);

new Users({ email: "test@test.com", password: "test" }).save();
