const bcrypt = require("bcryptjs");

const plain = "123456";
const hash = bcrypt.hashSync(plain, 10);
console.log(hash);
