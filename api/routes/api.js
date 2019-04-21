const router = require("express-promise-router")();
const userController = require("../controllers/user");
const tweetController = require("../controllers/tweet");
const passport = require("passport");
// eslint-disable-next-line no-unused-vars
const passportConf = require("../passport");

router
  /**
   *  @swagger
   *
   *  paths:
   *   /user/signup:
   *    post:
   *     summary: Create new user.
   *     consumes:
   *      - application/json
   *     tags:
   *      - user
   *
   *     parameters:
   *      - in: body
   *        name: user
   *        schema:
   *         $ref: "#/definitions/User"
   *
   *     responses:
   *       200:
   *        description: create new user
   *        content:
   *         text/plain:
   *          schema:
   *           type: {}
   *       400:
   *        description: User alredy Exists
   *
   */
  .post("/user/signup", userController.validate, userController.signUp)

  /**
   *  @swagger
   *
   *  paths:
   *   /user/signin:
   *    post:
   *     summary: Login into app.
   *     consumes:
   *      - application/json
   *     tags:
   *      - user
   *
   *     parameters:
   *      - in: body
   *        name: user
   *        schema:
   *         $ref: "#/definitions/UserSignIn"
   *
   *     responses:
   *       200:
   *        description: Login
   *        headers:
   *         Set-Cookie:
   *          schema:
   *           type: string
   *           example: authorization=token; Path=/; HttpOnly
   *        content:
   *         text/plain:
   *          schema:
   *           type: {}
   *       400:
   *        description: Bad Request
   *
   */
  .post(
    "/user/signin",
    userController.emailToLowerCase,
    userController.validate,
    passport.authenticate("local", { session: false }),
    userController.signIn
  )
  /**
   *  @swagger
   *
   *  paths:
   *   /user/me:
   *    get:
   *     summary: Get user.
   *     consumes:
   *      - application/json
   *     tags:
   *      - user
   *     description: Get user info
   *
   *     responses:
   *       200:
   *        description: Current user
   *        content:
   *         text/plain:
   *          schema:
   *           type: {}
   *       401:
   *        description: Unauthorized
   *
   */
  .get(
    "/user/me",
    passport.authenticate("jwt", { session: false }),
    userController.getUser
  )

  /**
   *  @swagger
   *
   *  paths:
   *   /user/logout:
   *    get:
   *     summary: Logout user.
   *     consumes:
   *      - application/json
   *     tags:
   *      - user
   *     description: Logout user
   *     parameters:
   *      - in: query
   *        name: redirectUrl
   *        type: string
   *        required: true
   *        description: Redirect url.
   *
   *     responses:
   *       200:
   *        description: Logout user
   *        content:
   *         text/plain:
   *          schema:
   *           type: {}
   *       401:
   *        description: Unauthorized
   *
   */

  .get(
    "/user/logout",
    passport.authenticate("jwt", { session: false }),
    userController.logout
  )

  /**
   *  @swagger
   *
   *  paths:
   *   /tweet:
   *    post:
   *     summary: Create a Tweet
   *     consumes:
   *      - application/json
   *     tags:
   *      - tweet
   *
   *     parameters:
   *      - in: body
   *        name: user
   *        schema:
   *         $ref: "#/definitions/Tweet"
   *
   *     responses:
   *       200:
   *        description: Created Tweet
   *        content:
   *         text/plain:
   *          schema:
   *           type: {}
   *       400:
   *        description: Bad Request
   *
   */
  .post(
    "/tweet",
    passport.authenticate("jwt", { session: false }),
    tweetController.createTweet
  )

  /**
   *  @swagger
   *
   *  paths:
   *   /tweet:
   *    get:
   *     summary: Get tweets list.
   *     consumes:
   *      - application/json
   *     tags:
   *      - tweet
   *     description: Tweets list
   *     parameters:
   *      - in: query
   *        name: count
   *        type: integer
   *        description: how much
   *
   *     responses:
   *       200:
   *        description: Logout user
   *        content:
   *         text/plain:
   *          schema:
   *           type: {}
   *       401:
   *        description: Unauthorized
   *
   */
  .get(
    "/tweet",
    passport.authenticate("jwt", { session: false }),
    tweetController.getTweets
  );

module.exports = router;
