const { MongoError } = require("../config/error");
const { logOut } = require("../../logger/logger");
const Tweet = require("../models/tweet");

module.exports = {
  createTweet: async (req, res, next) => {
    try {
      const { message } = req.body;
      // eslint-disable-next-line camelcase
      const { _id: user_id } = req.user;

      const newTweet = new Tweet({ message, user_id, likes: [] });
      return await newTweet.save((err, tweet) => {
        if (err) {
          return new MongoError("Schema save failed");
        }
        logOut(tweet);
        res.json({ tweet });
      });
    } catch (error) {
      next(error);
    }
  },

  getTweets: async (req, res, next) => {
    try {
      const { count } = req.query;

      const tweets = await Tweet.find({})
        .sort({ date: -1 })
        .limit(parseInt(count) || 50);
      logOut(tweets);
      res.json({ tweets });
    } catch (error) {
      next(new MongoError("Schema get failed"));
    }
  }
};
