const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

const { BCRYPT_WORK_FACTOR } = require("../config");
const { createUserToken } = require("../utils/tokens");

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // created_at: user.created_at,
      // updated_at: user.updated_at,
    };
  }

  /**
   * Login user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @param {User} creds - user credentials
   * @returns user
   **/

  static async login(creds) {
    const { email, password } = creds;
    const requiredCreds = ["email", "password"];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "user authentication",
      });
    } catch (err) {
      throw err;
    }

    const user = await User.fetchUserByEmail(email);

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        const userToken = createUserToken(user.id, user.email);
        // return this._createPublicUser(user);
        return userToken;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    const { username, password, firstName, lastName, email } = creds;
    const requiredCreds = [
      "username",
      "password",
      "firstName",
      "lastName",
      "email",
    ];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "user registration",
      });
    } catch (err) {
      throw err;
    }

    const existingUserWithEmail = await User.fetchUserByEmail(email);
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users (
          username,
          password,
          first_name,
          last_name,
          email
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id,
                  username,
                  email,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  created_at
                  `,
      [username, hashedPassword, firstName, lastName, email.toLowerCase()]
    );

    const user = result.rows[0];
    // If you want to make it so the user auto logs in as soon as you register then add this line.
    // const userToken = createUserToken(user.id, user.email);
    // return userToken;
    return user;
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
              email, 
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              created_at,
              updated_at            
           FROM users
           WHERE email = $1`,
      [email.toLowerCase()]
    );

    const user = result.rows[0];

    return user;
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchById(userId) {
    const result = await db.query(
      `SELECT id,
              email,    
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              created_at,
              updated_at            
           FROM users
           WHERE id = $1`,
      [userId]
    );

    const user = result.rows[0];

    return user;
  }
}

module.exports = User;
