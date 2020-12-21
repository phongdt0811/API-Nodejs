const { route } = require('.');
const { verify } = require('../../../middle');
const { 
    getListComments,
    saveComment
} = require('../functions');

module.exports = function(router) {
    /* GET LIST COMMENTS */
    router.get('/comments', verify, getListComments);
    /* POST A COMMENT */
    router.post('/comments', verify, saveComment);
}