const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bycrypt = require('bcryptjs');

/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - email
 *       - password
 *     properties:
 *       email:
 *         type: string
 *         example: some@mail.com
 *       password:
 *         type: string
 *         example: 123456789q
 *       username:
 *         type: string
 *         example: Jony
 *
 */



const UsersSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email field is required'],
        unique: [true, 'email field is unique'],
        lowercase: true,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'password field is required'],
    }
});

UsersSchema.pre('save', async function (next) {
    try {
        const salt =  await bycrypt.genSalt(10);
        const passwordHash = await bycrypt.hash(this.password, salt);
        this.password = passwordHash;
        next();
    } catch(error) {
        next(error);
    }
});

UsersSchema.methods.isValidPassword = async function(newPassword) {
    try {
        return await bycrypt.compare(newPassword, this.password);
    } catch(error) {
        throw new Error(error);
    }
};

const User = mongoose.model('user', UsersSchema);
module.exports = User;
