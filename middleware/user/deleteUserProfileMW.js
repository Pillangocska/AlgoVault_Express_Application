/**
 * This MW deletes the currently logged in user profile from DB and all of its algorithms
 */
module.exports = function (objRepo) {
    const UserModel = objRepo.UserModel;
    const AlgoModel = objRepo.AlgoModel;

    return async function (req, res, next) {
        console.log('deleteUserProfileMW: Attempting to delete user profile');

        try {
            const userId = req.session.userId;

            if (!userId) {
                console.log('deleteUserProfileMW: No user ID found in session');
                return res.status(401).redirect('/login');
            }

            console.log(`deleteUserProfileMW: Deleting user with ID: ${userId}`);

            // Delete the user
            const deletedUser = await UserModel.findByIdAndDelete(userId);

            if (!deletedUser) {
                console.log('deleteUserProfileMW: User not found in database');
                return res.status(404).redirect('/user_profile');
            }

            console.log(`deleteUserProfileMW: User deleted: ${deletedUser.username}`);

            // Delete all algorithms associated with this user
            const deleteResult = await AlgoModel.deleteMany({ _author: userId });
            console.log(`deleteUserProfileMW: Deleted ${deleteResult.deletedCount} algorithms`);

            // Clear the session
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    return res.status(500).redirect('/user_profile');
                }
                res.clearCookie('token');
                console.log('deleteUserProfileMW: Session destroyed, redirecting to login');
                res.redirect('/login');
            });
        } catch (error) {
            console.error('Error deleting user profile:', error);
            res.status(500).redirect('/user_profile');
        }
    };
};
