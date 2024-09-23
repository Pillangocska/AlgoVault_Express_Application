/**
 * This MW fetches an algorithm by ID from DB
 */
module.exports = function (objRepo) {
    const AlgoModel = objRepo.AlgoModel;

    return async function (req, res, next) {
        console.log('getAlgorithmMW: Fetching algorithm by ID');

        try {
            const algorithmId = req.params.id;

            const algorithm = await AlgoModel.findById(algorithmId).populate('_author', 'username');

            if (!algorithm) {
                return res.status(404).send('Algorithm not found');
            }

            res.locals.algorithm = algorithm;
            next();
        } catch (error) {
            // For the testing logs not to look ugly
            if (process.env.NODE_ENV !== 'test') {
                console.error('Error fetching algorithm:', error);
            }
            res.status(500).send('An error occurred while fetching the algorithm');
        }
    };
};
