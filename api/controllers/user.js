const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/env').secret;
const productName = require('../config/env').name;

createToken = user => jwt.sign({
	iss: productName,
	sub: user.id,
	iat: new Date().getTime(),
	exp: new Date().setDate(new Date().getDate() + 1)
}, secret)

module.exports = {
	signUp: async (req, res, next) => {
		try {
		const { email, password, name } = req.body;
		let newUser = new User ({ email, password, name });
		return await newUser.save( (err, user) => {
			if (err) return err;
			const access_token = createToken(user);
			console.log(`=> `, access_token);
			res.json({ access_token });
		});
		} catch(error) {
		next(error);
		}
	},
	signIn: async (req, res, next) => {
		const access_token = createToken(req.user);
		console.log(`=> `, access_token);
		res.json({ access_token });
	},
	getUser: async(req, res, next) => {
		const { _id, email, name } = req.user;
		const user = { _id, email, name };
		console.log(`=> `, user);
		res.status(200).json(user);
	},
	emailToLowerCase: async (req, res, next) => {
		req.body.email = await req.body.email.toLowerCase();
		next();
	},
}