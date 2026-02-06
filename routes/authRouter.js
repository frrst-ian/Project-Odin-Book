require("dotenv").config();
const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");
const {
    loginValidator,
    registerValidator,
} = require("../validators/userValidator");
const jwt = require("jsonwebtoken");
const passport = require("../config/passport");
const upload = require("../config/cloudinary");

authRouter.post(
    "/register",
    upload.single("profilePicture"),
    registerValidator,
    authController.postRegister,
);
authRouter.post("/login", loginValidator, authController.postLogin);

authRouter.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] }),
);

authRouter.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login",
        session: false,
    }),
    (req, res) => {
        try {
            const token = jwt.sign(
                { userId: req.user.id, email: req.user.email },
                process.env.JWT_SECRET,
                { expiresIn: "7d" },
            );

            res.redirect(`http://localhost:5173/auth/callback?token=${token}`);
        } catch (err) {
            console.error("JWT generation error:", err);
            res.status(500).json({ message: "Failed to generate token" });
        }
    },
);

module.exports = authRouter;
