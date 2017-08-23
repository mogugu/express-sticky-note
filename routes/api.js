var express = require('express');
var router = express.Router();

/* GET api listing. */
router.get('/notes', function(req, res, next) {
    console.log("notes");

});
router.post('/note/create',function (req,res,next) {

});
router.post('/note/edit',function (req,res,next) {

});
router.post("/note/delete",function (req,res,next) {

});
module.exports = router;

