/**
 * This MW saves an algorithm or updates an existing one in DB
 */
module.exports = function (objRepo) {
    const AlgoModel = objRepo.AlgoModel;

    return async function (req, res, next) {
        console.log('saveAlgorithmMW: Saving algorithm');

        try {
            const { name, category, timeComplexity, spaceComplexity, description, pseudocode } = req.body;
            const userId = req.session.userId;
            const algorithmId = req.params.id;

            const algorithmData = {
                name,
                category,
                timeComplexity,
                spaceComplexity,
                description,
                pseudocode,
                _author: userId,
                dateAdded: new Date()
            };

            if (algorithmId) {
                // Update existing algorithm
                await AlgoModel.findOneAndUpdate(
                    { _id: algorithmId, _author: userId },
                    algorithmData,
                    { new: true, runValidators: true }
                );
            } else {
                // Create new algorithm
                const newAlgorithm = new AlgoModel(algorithmData);
                await newAlgorithm.save();
            }

            res.redirect('/my_algorithms');
        } catch (error) {
            console.error('Error saving algorithm:', error);
            if (error.name === 'ValidationError') {
                // Handle validation errors
                const validationErrors = Object.values(error.errors).map(err => err.message);
                res.status(400).send(`Validation error: ${validationErrors.join(', ')}`);
            } else {
                res.status(500).send('An error occurred while saving the algorithm');
            }
        }
    };
};
