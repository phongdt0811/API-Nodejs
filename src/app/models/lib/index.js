const _ = require('lodash');

exports.doQuery = async function(query) {
    return db.promise().query(query)
        .then(data => {
            return _.first(data);
        })
        .catch(err => {
            return false;
        });
}