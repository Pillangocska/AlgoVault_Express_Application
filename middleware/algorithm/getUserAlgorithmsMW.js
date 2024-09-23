/**
 * This MW fetches all algorithms created by the current user from DB
 */
module.exports = function (objRepo) {
    const AlgoModel = objRepo.AlgoModel;

    return async function (req, res, next) {
        console.log('getUserAlgorithmsMW: Fetching user algorithms');

        try {
            const userId = req.session.userId;

            const userAlgorithms = await AlgoModel.find({ _author: userId }).select('name category');

            res.locals.userAlgorithms = userAlgorithms;
            next();
        } catch (error) {
            console.error('Error fetching user algorithms:', error);
            res.status(500).send('An error occurred while fetching user algorithms');
        }
    };
};
