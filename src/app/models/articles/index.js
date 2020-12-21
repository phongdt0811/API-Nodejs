const { doQuery } = require('../lib');
const _ = require('lodash');

class Articles { 
    constructor(){
    }
    async getList(pagination) {
        const query = `
            SELECT * FROM articles
            LIMIT ${pagination.offset}, ${pagination.limit}
        `;
        const result = await doQuery(query);
        return {
            total: _.size(result),
            result
        }
    }
    async add(article) {
        const query = `
            INSERT INTO articles(title, nickname, content)
            VALUES ('${article.title}', '${article.nickname}', '${article.content}')
        `;
        return doQuery(query);
    }
    async findArticleById(aId) {
        const query =  `
            SELECT * from articles
            WHERE id = ${aId}
        `;
        return doQuery(query);
    }
    
}

module.exports = new Articles();