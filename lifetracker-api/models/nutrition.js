const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

class Nutrition {
  /**
   * Fetch a user in the database by user id
   *
   * @param {String} userId
   * @returns user
   */
  static async fetchByUserId(userId) {
    const result = await db.query(
      `SELECT *       
           FROM nutrition
           WHERE user_id = $1`,
      [userId]
    );

    return result.rows;
  }
  static async createNutrition(creds) {
    const { userId, name, category, quantity, calories, image_url } = creds;
    const requiredCreds = [
      "userId",
      "name",
      "category",
      "quantity",
      "calories",
      "image_url",
    ];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "create nutrition",
      });
    } catch (err) {
      throw err;
    }

    const insertedData = await db.query(
      `INSERT INTO nutrition (
          name,
          category,
          quantity,
          calories,
          image_url,
          user_id
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id,
                  name,
                  category,            
                  quantity, 
                  calories,
                  image_url,
                  user_id
                  `,
      [name, category, quantity, calories, image_url, userId]
    );

    const data = insertedData.rows[0];
    // If you want to make it so the user auto logs in as soon as you register then add this line.
    // const userToken = createUserToken(user.id, user.email);
    // return userToken;
    return data;
  }
}

module.exports = Nutrition;
