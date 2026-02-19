// middleware/auth.js
const passport = require("../config/passport");
const jwt = require("jsonwebtoken");

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const token = authHeader.split(" ")[1].trim();
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        if (payload.isGuest) {
            // Attach a guest user object directly 
            req.user = {
                id: payload.userId,
                name: "Guest User",
                email: null,
                profilePicture: "https://api.dicebear.com/7.x/bottts/svg?seed=guest",
                isGuest: true,
            };
            return next();
        }

        // For real users, fall through to passport
        passport.authenticate("jwt", { session: false })(req, res, next);
    } catch {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = authenticateJwt;