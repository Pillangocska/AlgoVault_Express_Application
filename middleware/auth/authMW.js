/**
 * This MW authenticates the user
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        console.log('authMW: Checking authentication');

        if (req.session.userId) {
            // User is authenticated
            return next();
        } else {
            // User is not authenticated, redirect to login page
            res.redirect('/login');
        }
    };
};
