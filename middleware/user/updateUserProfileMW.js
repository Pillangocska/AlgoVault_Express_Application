const bcrypt = require('bcrypt');

/**
 * This MW updates the currently logged in user profile
 */
module.exports = function (objRepo) {
    const UserModel = objRepo.UserModel;

    return async function (req, res, next) {
        console.log('updateUserProfileMW: Updating user profile');

        try {
            const userId = req.session.userId;
            const { username, email, phone, address, specializedField, newPassword } = req.body;

            const updateData = {
                username,
                email,
                phone,
                address,
                specialized: specializedField
            };

            if (newPassword) {
                updateData.password = await bcrypt.hash(newPassword, 10);
            }

            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                updateData,
                { new: true, runValidators: true }
            );

            if (!updatedUser) {
                return res.status(404).send('User not found');
            }

            res.redirect('/user_profile');
        } catch (error) {
            console.error('Error updating user profile:', error);
            if (error.name === 'ValidationError') {
                // Handle validation errors
                const validationErrors = Object.values(error.errors).map(err => err.message);
                res.status(400).send(`Validation error: ${validationErrors.join(', ')}`);
            } else {
                res.status(500).send('An error occurred while updating the profile');
            }
        }
    };
};
