// Middleware functions
const authMW = require('../middleware/auth/authMW');
const validateLoginMW = require('../middleware/auth/validateLoginMW');
const validateRegMW = require('../middleware/auth/validateRegMW');
const loginUserMW = require('../middleware/auth/loginUserMW');
const logoutUserMW = require('../middleware/auth/logoutUserMW');
const registerUserMW = require('../middleware/auth/registerUserMW');
const renderMW = require('../middleware/renderMW');
const getAlgorithmsMW = require('../middleware/algorithm/getAlgorithmsMW');
const getUserAlgorithmsMW = require('../middleware/algorithm/getUserAlgorithmsMW');
const getAlgorithmMW = require('../middleware/algorithm/getAlgorithmMW');
const saveAlgorithmMW = require('../middleware/algorithm/saveAlgorithmMW');
const deleteAlgorithmMW = require('../middleware/algorithm/deleteAlgorithmMW');
const getUserProfileMW = require('../middleware/user/getUserProfileMW');
const updateUserProfileMW = require('../middleware/user/updateUserProfileMW');
const deleteUserProfileMW = require('../middleware/user/deleteUserProfileMW');
const forgotPasswordMW = require('../middleware/auth/forgotPasswordMW');
// Models
const AlgoModel = require('../models/algo');
const UserModel = require('../models/user');

module.exports = function (app) {

    const objRepo = {
        AlgoModel: AlgoModel,
        UserModel: UserModel
    };

    // Login & Out routes
    app.get('/login',
        renderMW(objRepo, 'login'));
    app.get('/logout',
        logoutUserMW(objRepo));
    app.post('/login',
        validateLoginMW(objRepo),
        loginUserMW(objRepo));

    // Forgot Password routes
    app.get('/forgot-password',
        renderMW(objRepo, 'forgot-password'));
    app.post('/forgot-password',
        forgotPasswordMW(objRepo));

    // Registration routes
    app.get('/register',
        renderMW(objRepo, 'registration'));
    app.post('/register',
        validateRegMW(objRepo),
        registerUserMW(objRepo));

    // Main page route
    app.get('/main_page',
        authMW(objRepo),
        getAlgorithmsMW(objRepo),
        renderMW(objRepo, 'main_page'));

    // My Algorithms route
    app.get('/my_algorithms',
        authMW(objRepo),
        getUserAlgorithmsMW(objRepo),
        renderMW(objRepo, 'my_algorithms'));

    // User Profile routes
    app.get('/user_profile',
        authMW(objRepo),
        getUserProfileMW(objRepo),
        renderMW(objRepo, 'user_profile'));
    app.post('/user_profile',
        authMW(objRepo),
        updateUserProfileMW(objRepo));
    app.delete('/user_profile',
        authMW(objRepo),
        deleteUserProfileMW(objRepo));

    // Show Algorithm route
    app.get('/show_algo/:id',
        authMW(objRepo),
        getAlgorithmMW(objRepo),
        renderMW(objRepo, 'show_algo'));

    // Edit Algorithm routes
    app.get('/edit_algo/:id',
        authMW(objRepo),
        getAlgorithmMW(objRepo),
        renderMW(objRepo, 'edit_algo'));
    app.post('/edit_algo/:id',
        authMW(objRepo),
        saveAlgorithmMW(objRepo));
    app.delete('/edit_algo/:id',
        authMW(objRepo),
        deleteAlgorithmMW(objRepo));

    // Add New Algorithm routes
    app.get('/add_new_algo',
        authMW(objRepo),
        renderMW(objRepo, 'add_new_algo'));
    app.post('/add_new_algo',
        authMW(objRepo),
        saveAlgorithmMW(objRepo));
};
