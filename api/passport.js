const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const jwtSecret = require('./config/env').jwtSecret;
const User = require('./models/user');
const { MongoError } = require("./config/error");

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['authorization'];
    }
    return token;
};

passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: jwtSecret
}, async (payLoad, done) => {
    try {
        const user = await User.findById(payLoad.sub);
        if(!user) {
            throw new MongoError('User not found');
        }

        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return done(null, false);
        }

        const isMatch =  await user.isValidPassword(password);
        if(!isMatch) {
            throw new MongoError('Password is not valid');
        }

        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));
