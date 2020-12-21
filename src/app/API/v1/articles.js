const { verify } = require('../../../middle');
const { 
    getListArticles,
    saveArticle,
    getArticle
} = require('../functions');

module.exports = function(router) {
    /* GET LIST ARTICLE */
    router.get('/articles', verify, getListArticles);
    /* POST AN ARTICLE */
    router.post('/articles', verify, saveArticle);
    /* GET AN ARTICLE */
    router.get('/articles/:aId', verify, getArticle)
}