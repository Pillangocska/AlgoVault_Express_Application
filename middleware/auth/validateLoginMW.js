/**
 * This MW is for basic login validation
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        console.log('validateLoginMW: Validating login inputs');
        const { username, password } = req.body;
        if (!username || !password) {
            res.locals.error = 'Username and password are required';
            return res.render('login', { error: res.locals.error });
        }
        next();
    };
};
