const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../users/user.schema');

passport.use(new LocalStrategy( async (username, password, done) => {
    try {
        const userDoc = await User.findOne({ username: username });
        if(!userDoc) {
            return done(null, false, 'User not found');
        }

        const isMatch = await userDoc.comparePassword(password);
        if (!isMatch) {
            return done(null, false, 'User doesn\'t match password');
        }
        done(null, userDoc);
    } catch (e) {
        return done(e);
    }
}))

passport.serializeUser((user, done) => { done(null, user); });

passport.deserializeUser(async(user, done) => {
    try {
        console.log("Find for user!");
        done(null, user);
    }catch (e) {
        done(e);
    }
});

module.exports = passport;
