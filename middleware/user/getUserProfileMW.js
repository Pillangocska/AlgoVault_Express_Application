/**
 * This MW returns the currently logged in user profile from DB
 */
module.exports = function (objRepo) {
    const UserModel = objRepo.UserModel;

    return async function (req, res, next) {
        console.log('getUserProfileMW: Fetching user profile');

        try {
            const userId = req.session.userId;

            // Exclude the password field
            const user = await UserModel.findById(userId).select('-password');

            if (!user) {
                return res.status(404).send('User not found');
            }

            res.locals.user = user;
            next();
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).send('An error occurred while fetching the profile');
        }
    };
};
