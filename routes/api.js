var express = require('express');
var router = express.Router();
var Note=require('../model/note');

/* GET api listing. */
router.get('/notes', function(req, res, next) {
    var opts={raw:true};
    Note.findAll(opts).then(function (notes) {
        console.log(notes);
        res.send({status:0,data:notes});
    }).catch(function () {
        res.send({status:1,errorMsg:'数据库异常'});
    });
    res.send({status:0,data:data});
});
/*新增note*/
router.post('/note/create',function (req,res,next) {
    var note=req.body.note;
    Note.create({text:note}).then(function () {
        res.send({status:0})
    }).catch(function () {
        res.send({status:1,errorMsg:'数据库异常或者你没有权限'});
    })
});
/*修改note*/
router.post('/note/edit',function (req,res,next) {
    var noteId=req.body.id;
    var note=req.body.note;
    Note.update({text:note},{where:{id:noteID}}).then(function () {
         res.send({status:0})
    }).catch(function () {
        res.send({status:1})
    });
});

/*删除note*/
router.post("/note/delete",function (req,res,next) {
    var noteId=req.body.id;
    Note.destroy({where:{id:noteId}}).then(function () {
        res.send({status:0})
    }).catch(function () {
        res.send({status:1})
    })
});
module.exports = router;

