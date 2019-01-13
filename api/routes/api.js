const router = require('express-promise-router')()
const userController = require('../controllers/user')
const passport = require('passport')
const passportConf = require('../passport')

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
.post('/user/signup', userController.signUp)

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
     *         $ref: "#/definitions/User"
     *  
     *     responses:
     *       200:
     *        description: get access token
     *        content:
     *         text/plain:
     *          schema:
     *           type: {}
     *       400:
     *        description: Bad Request
     *  
     */
.post('/user/signin', userController.emailToLowerCase, passport.authenticate('local', { session: false }), userController.signIn)
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
     *     security:
     *      - signIn: []
     *     description: Get user info
     *  
     *     responses:
     *       200:
     *        description: Current user
     *        content:
     *         text/plain:
     *          schema:
     *           type: {}
     *       400:
     *        description: Bad request
     *  
     */
.get('/user/me', passport.authenticate('jwt', { session: false }), userController.getUser)


module.exports = router;