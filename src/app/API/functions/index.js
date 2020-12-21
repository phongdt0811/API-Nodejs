const { Article, Comment } = require('../../models');
const { getBody, getPagination } = require('../lib');
const _ = require('lodash');
const { saveReply } = require('../../models/comments');

exports.getListArticles = async (req, res) => {
    const pagination = getPagination(req);
    const result = await Article.getList(pagination);
    res.status(200).json({ success: true, msg: true, data: result });
}
exports.saveArticle = async (req, res) => {
    const { data } = getBody(req);
    const result = await Article.add(data);
    res.status(200).json({ success: true, msg: true, result });
}

exports.getArticle = async (req, res) => {
    const { aId } = req.params;
    if(!aId) 
        res.status(400).json({ success: false, error: 'missing params'});
    const result = await Article.findArticleById(aId);
    if(!_.size(result))
        res.status(400).json({ success: false, error: 'not found'});
    res.status(200).json({ success: true, data: result });
}

exports.getListComments = async (req, res) => {
    const { aId } = req.query;
    if(!aId) 
        res.status(400).json({ success: false, error: 'missing params'});
    const result = await Comment.findByAId(aId);
    if(!result)
        res.status(400).json({ success: false, error: 'not found'});
    res.status(200).json({ success: true, msg: true, result });
}

exports.saveComment = async (req, res) => {
    const { data } = getBody(req);
    var result;
    if(isReplyComment(data)) {
        const verifyComment = await Comment.verifyComment(data.cId, data.aId);
        if(verifyComment) result = await Comment.saveReply(data);
    } else 
        result = await Comment.saveComment(data);
    if(!result)
        res.status(400).json({ success: false, error: 'save fail'});
    res.status(200).json({ success: true, msg: true, result });
}
function isReplyComment(comment) {
    return _.get(comment, 'cId', false);
}