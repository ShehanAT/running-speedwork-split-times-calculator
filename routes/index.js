var router = require('express').Router();

router.use('/',  function(req, res, next) {
    res.sendFile("../public/index.html");
});

module.exports = router;