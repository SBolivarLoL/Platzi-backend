const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
}

module.exports = { hashPassword };
