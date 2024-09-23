const crypto = require('crypto');
const bcrypt = require('bcrypt');

/**
 * This MW sets and sends the users new password to the console
 */
module.exports = function (objRepo) {
    const UserModel = objRepo.UserModel;

    return async function (req, res, next) {
        const { username } = req.body;

        try {
            const user = await UserModel.findOne({ username });

            if (!user) {
                return res.render('forgot-password', { error: 'User not found' });
            }

            // Generate a new random password
            const newPassword = crypto.randomBytes(8).toString('hex');

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password in the database
            await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

            // Log the new password to the console
            console.log(`New password for ${username}: ${newPassword}`);

            // Render the success page
            res.render('password-reset-success', { username });

        } catch (error) {
            console.error('Error in forgot password process:', error);
            res.render('forgot-password', { error: 'An error occurred during the password reset process' });
        }
    };
};
