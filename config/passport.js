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

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/api/auth/github/callback",
            scope: ["user:email"],
            customLogic: async (accessToken, profile) => {
                const emailsResponse = await require("axios").get(
                    "https://api.github.com/user/emails",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    },
                );
                const primaryEmail = emailsResponse.data.find(
                    (email) => email.primary,
                )?.email;
                profile.emails = [{ value: primaryEmail }];
            },
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const user = await db.getUserByEmail(email);
                if (!user) {
                    const user = await db.createUser(
                        profile.displayName,
                        email,
                    );
                }
                return done(null, user);
            } catch (err) {
                console.error("Github auth err: ", err);
                return done(err, false);
            }
        },
    ),
);

module.exports = passport;
