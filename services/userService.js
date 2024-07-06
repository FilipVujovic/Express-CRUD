const db = require("../database");
const encryptPass = require("../utils/encrypt-pass");
const crypto = require("crypto");

exports.createUser = async (email, pass) => {
if(pass.password != pass.passwordConfirmation) {
    throw({
      status:400,
      message: 'Passwords do not match.'
    });
  };

  const encrypredPassword = await encryptPass.encryptPassword(pass.password);
  const getQuery = `SELECT * from "users" WHERE email='${email}'`;
  const insertQuery = `INSERT INTO "users"(id, email, password)
	VALUES ('${crypto.randomUUID()}', '${email}', '${encrypredPassword}');`;

  const getResult = await db.query(getQuery);

  if(getResult.rowCount === 1) {
    throw ({
      status: 400,
      message: 'This e-mail is already taken.'
    })
  }

  const dbResult = await db.query(insertQuery);
  return dbResult;
};

exports.signIn = async (email, password) => {
  const getQuery = `SELECT id, password FROM "users" WHERE email='${email}'`;
  const getResult = await db.query(getQuery);

  if (getResult.rowCount === 0) {
    throw ({ status: 404, message: 'An account with this e-mail does not exist.' });
  }

  const passwordsMatch = await encryptPass.dectyptPassword(
    password,
    getResult.rows[0].password
  );

  if(!passwordsMatch) {
    throw ({ status: 400, message: 'Incorrect username or password.' });
  }

  const jwt = encryptPass.signToken({
    id: getResult.rows[0].id,
    email
  });

  return jwt;
};
