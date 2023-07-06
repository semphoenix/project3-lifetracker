const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class Exercise {
  /**
   * Fetch a user in the database by user id
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchByUserId(userId) {
    const result = await db.query(
      `SELECT id,
              name,
              category,
              duration,
              intensity          
           FROM nutrition
           WHERE user_id = $1`,
      [userId]
    );

    console.log(result);

    return result;
  }
  static async createExercise(creds) {
    const { userId, name, category, duration, intensity } = creds;
    const requiredCreds = [
      "userId",
      "name",
      "category",
      "duration",
      "intensity",
    ];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "create exercise",
      });
    } catch (err) {
      throw err;
    }

    const insertExercise = await db.query(
      `INSERT INTO exercise (
          name,
          category,
          duration,
          intensity,
          user_id
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id,
                  name,
                  category,            
                  duration, 
                  intensity,
                  user_id
                  `,
      [name, category, duration, intensity, userId]
    );

    const exercise = insertExercise.rows[0];
    // If you want to make it so the user auto logs in as soon as you register then add this line.
    // const userToken = createUserToken(user.id, user.email);
    // return userToken;
    return exercise;
  }
}

module.exports = Exercise;
