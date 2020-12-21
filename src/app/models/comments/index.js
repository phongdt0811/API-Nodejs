const { doQuery } = require("../lib");
const _ = require('lodash');

class Comments { 
    constructor(){
    }
    async findByAId(aId) {
        const query = `
            SELECT * FROM comments
            WHERE aId = ${aId}
        `;
        const result = await doQuery(query);
        if(!result) return null;
        return {
            total: _.size(result),
            result
        }
    }
    async add(comment) {
        const query = `
            INSERT INTO comments(aId, nickname, content)
            VALUES (${comment.aId}, '${comment.nickname}', '${comment.content}')
        `;
        return doQuery(query);
    }
    async saveReply(comment) { 
        const query = `
            INSERT INTO comments(cId, aId, nickname, content)
            VALUES (${comment.cId}, ${comment.aId}, '${comment.nickname}', '${comment.content}')
        `;
        return doQuery(query);
    }
    async saveComment(comment) {
        return this.add(comment);
    }
    async verifyComment(cId, aId) {
        const query = `
            SELECT id FROM comments
            WHERE id = ${cId} and aId = ${aId}
        `;
        const result = await doQuery(query);
        if(!result || !_.size(result))
            return false;
        return result;
    }
}

module.exports = new Comments();