const bcrypt = require('bcrypt');
/**
 * This MW registers a user in DB
 */
module.exports = function (objRepo) {
    const UserModel = objRepo.UserModel;

    return async function (req, res, next) {
        console.log('registerUserMW: Attempting to register user');

        const { username, email, password, confirmPassword, phone, address, specializedField } = req.body;

        // Basic validation
        if (password !== confirmPassword) {
            console.log('registerUserMW: Password mismatch');
            res.locals.error = 'Passwords do not match';
            return next();
        }

        try {
            // Check if username or email already exists
            const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                console.log('registerUserMW: Username or email already exists');
                res.locals.error = 'Username or email already exists';
                return next();
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                phone,
                address,
                specialized: specializedField
            });

            await newUser.save();

            console.log('registerUserMW: User registered successfully');
            res.redirect('/login');
        } catch (error) {
            console.error('registerUserMW: Error during registration', error);
            res.locals.error = 'An error occurred during registration';
            return next();
        }
    };
};
