exports.getParams = (req) => {
    return req.query;
}
exports.getBody = (req) => {
    return { data: req.body }
}
exports.getPagination = (req) => {
    const { page, size } = req.query;
    return {
        limit: size || 20, 
        offset: page || 1
    }
}