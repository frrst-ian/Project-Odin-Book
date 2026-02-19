const requireAuth = (req, res, next) => {
    if (req.user?.isGuest) {
        return res.status(403).json({ 
            error: "Guests cannot perform this action. Please register." 
        });
    }
    next();
};

module.exports = requireAuth;