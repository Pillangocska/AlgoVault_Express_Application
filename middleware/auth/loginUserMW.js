const bcrypt = require('bcrypt');
/**
 * This MW logs the user in
 */
module.exports = function (objRepo) {
    const UserModel = objRepo.UserModel;

    return async function (req, res, next) {
        console.log('loginUserMW: Attempting to log in user');

        const { username, password } = req.body;

        try {
            // Find the user by username
            const user = await UserModel.findOne({ username });

            if (user && await bcrypt.compare(password, user.password)) {
                // Set user ID in session
                req.session.userId = user._id;

                console.log('loginUserMW: Login successful');
                return res.redirect('/main_page');
            } else {
                console.log('loginUserMW: Login failed');
                res.locals.error = 'Invalid username or password';
                return res.render('login', { error: res.locals.error });
            }
        } catch (error) {
            console.error('loginUserMW: Error during login', error);
            res.locals.error = 'An error occurred during login';
            return res.render('login', { error: res.locals.error });
        }
    };
};
