var express = require('express');
var { verify } = require('../../../middle');
var router = express.Router();

router.post('/app.init', verify, (req, res) => {
    console.log('App init');
    res.status(200).json({ success: true, msg: true })
});

require('./articles')(router);
require('./comments')(router);


module.exports = router;

