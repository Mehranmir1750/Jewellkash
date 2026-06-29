const admin = (req, res, next) => {

    // req.user is added by auth middleware
    // Check if the logged-in user is an admin
    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Access Denied. Admins only."
        });

    }

    // User is an admin, continue to the route
    next();

};

module.exports = admin;