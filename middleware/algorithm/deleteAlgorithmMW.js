/**
 * This MW deletes the specified algorithm from DB
 */
module.exports = function (objRepo) {
    const AlgoModel = objRepo.AlgoModel;

    return async function (req, res, next) {
        console.log('deleteAlgorithmMW: Attempting to delete algorithm');

        try {
            const algorithmId = req.params.id;
            const userId = req.session.userId;

            if (!userId) {
                console.log('deleteAlgorithmMW: No user ID found in session');
                return res.status(401).redirect('/login');
            }

            console.log(`deleteAlgorithmMW: Deleting algorithm with ID: ${algorithmId}`);

            const deletedAlgo = await AlgoModel.findOneAndDelete({ _id: algorithmId, _author: userId });

            if (!deletedAlgo) {
                console.log('deleteAlgorithmMW: Algorithm not found or user doesn\'t have permission');
                req.flash('error', 'Algorithm not found or you don\'t have permission to delete it');
                return res.redirect('/my_algorithms');
            }

            console.log(`deleteAlgorithmMW: Algorithm deleted: ${deletedAlgo.name}`);
            req.flash('success', 'Algorithm successfully deleted');
            res.redirect('/my_algorithms');
        } catch (error) {
            console.error('Error deleting algorithm:', error);
            req.flash('error', 'An error occurred while deleting the algorithm');
            res.redirect('/my_algorithms');
        }
    };
};
