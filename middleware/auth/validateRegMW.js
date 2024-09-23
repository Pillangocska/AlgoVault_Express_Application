/**
 * This MW is for basic reg validation
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        console.log('validateRegMW: Validating registration inputs');
        const { username, email, password, confirmPassword, phone, address, specializedField } = req.body;

        if (!username || !email || !password || !confirmPassword || !phone || !address || !specializedField) {
            res.locals.error = 'All fields are required';
            return res.render('registration', { error: res.locals.error });
        }

        if (password !== confirmPassword) {
            res.locals.error = 'Passwords do not match';
            return res.render('registration', { error: res.locals.error });
        }

        // more validations

        next();
    };
};
