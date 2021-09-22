const bcrypt = require("bcryptjs");
const saltRounds = 13;
const password = "aaa";
let hashedPassword;

async function createSuperuserPassword() {
  hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("only after generating password");
  console.log(hashedPassword);
}

createSuperuserPassword();
