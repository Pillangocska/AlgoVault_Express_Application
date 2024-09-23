/**
 * This MW logs the user out
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        console.log('logoutMW: Logging out user');

        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
            }
            res.redirect('/login');
        });
    };
};
