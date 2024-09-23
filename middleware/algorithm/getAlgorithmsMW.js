/**
 * This MW fetches all algorithms from DB
 */
module.exports = function (objRepo) {
    const AlgoModel = objRepo.AlgoModel;

    return async function (req, res, next) {
        console.log('getAlgorithmsMW: Fetching all algorithms');

        try {
            const algorithms = await AlgoModel.find().select('name category').populate('_author', 'username');

            res.locals.algorithms = algorithms;
            next();
        } catch (error) {
            console.error('Error fetching algorithms:', error);
            res.status(500).send('An error occurred while fetching algorithms');
        }
    };
};
