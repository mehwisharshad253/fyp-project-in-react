// isAdmin middleware
const isAdmin = (req, res, next) => {
    // Check if the user making the request is an admin
    if (req.user && req.user.role === 'admin') {
        // User is an admin, so allow the request to proceed
        next();
    } else {
        // User is not an admin, return an unauthorized response
        res.status(401).send({ error: 'Unauthorized. Only admin users are allowed to perform this action.' });
    }
};

module.exports = isAdmin;
