const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { InvalidTokenError } = require("./errors");

async function genToken(data) {
  return jwt.sign(data, SECRET_KEY, {
    expiresIn: "1h",
  });
}

async function createUserToken(userId, userEmail, userName) {
  const newUser = {
    id: userId,
    email: userEmail,
    firstName: userName,
  };
  return genToken(newUser);
}

async function validateUserToken(token) {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    if (decodedToken) return decodedToken;
    else throw new InvalidTokenError();
  } catch (e) {
    if (e instanceof InvalidTokenError) {
      console.log("Invalid Token");
      return undefined;
    }
    console.log(
      "Error caught while trying to verify token: ",
      token,
      "Error: ",
      error
    );
    throw e;
  }
}

module.exports = {
  genToken,
  createUserToken,
  validateUserToken,
};
