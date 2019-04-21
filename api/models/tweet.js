const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * @swagger
 *
 * definitions:
 *   user_id:
 *     type: string
 *     format: uuid
 *     example: 5c3d1bbfa53ead47174281e5
 *   Tweet:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         example: Hello word
 *
 */

const UserSchema = new Schema({
  user_id: {
    type: ObjectId
  }
});

const LikeSchema = new Schema({
  id: {
    type: String
  },
  users: {
    type: [UserSchema]
  }
});

const TweetSchema = new Schema({
  message: {
    type: String
  },
  user_id: {
    type: UserSchema
  },
  likes: {
    type: [LikeSchema]
  }
});

const Tweet = mongoose.model("tweet", TweetSchema);
module.exports = Tweet;
