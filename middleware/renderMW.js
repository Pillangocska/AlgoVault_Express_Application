/**
 * Using the template engine render the values into the template
 */

const path = require('path');

module.exports = function (objRepo, viewName, additionalData = {}) {
    return function (req, res) {
        try {
            const viewData = { ...res.locals, ...additionalData };
            res.render(viewName, viewData);
            console.log(`renderMW: Rendering ${viewName}`);
        } catch (error) {
            console.error(`renderMW: Error rendering ${viewName}`, error);
            res.status(500).send('Internal Server Error');
        }
    };
};
