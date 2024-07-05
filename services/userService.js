const db = require("../database");
const encryptPass = require("../utils/encrypt-pass");
const crypto = require("crypto");

exports.createUser = async (email, password) => {
  const encrypredPassword = await encryptPass.encryptPassword(password);

  const insertQuery = `INSERT INTO "user"(id, email, password)
	VALUES ('${crypto.randomUUID()}', '${email}', '${encrypredPassword}');`;

  const dbResult = await db.query(insertQuery);
  return dbResult;
};

exports.signIn = async (email, password) => {
  const getQuery = `SELECT id, password FROM "user" WHERE email='${email}'`;
  const getResult = await db.query(getQuery);

  if (getResult.rowCount === 0) {
    throw ({ status: 404, message: 'This e-mail address is already taken.' });
  }

  const passwordsMatch = await encryptPass.dectyptPassword(
    password,
    getResult.rows[0].password
  );

  if(!passwordsMatch) {
    throw ({ status: 404, message: 'Incorrect username or password.' });
  }

  const jwt = encryptPass.signToken(email);

  return jwt;
};
