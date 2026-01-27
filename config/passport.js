const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use(
    new LocalStrategy(
        { usernameField: "email", passReqToCallback: true },
        async (req, email, password, done) => {
            try {
                const user = await db.getUserByEmail(email);
                req.user = user;

                if (!user) {
                    return done(null, false, {
                        error: "Incorrect email",
                    });
                }

                const match = await bcrypt.compare(password, user.password);
                if (!match) {
                    return done(null, false, {
                        error: "Incorrect password",
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err);
            }
        },
    ),
);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const user = await db.getUserById(payload.userId);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (err) {
                return done(err, false);
            }
        },
    ),
);

module.exports = passport;
