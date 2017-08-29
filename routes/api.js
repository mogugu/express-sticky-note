var express = require('express');
var router = express.Router();
var Note=require('../model/note.js');
var User=require('../model/user.js');

/* GET api listing. */
router.get('/notes', function(req, res, next) {
    var opts={raw:true};
    if(req.session.user){
        opts.where={uid:req.session.user.id}
    }
    Note.findAll(opts).then(function (notes) {
        console.log(notes.length);
        notes.forEach(function (cur,idx,arr){
            if(cur.uid){
                User.findAll({raw:true,where:{uid:cur.uid}}).then(function (user) {
                    notes[idx].username=user[0].username;
                    if(idx===notes.length-1){
                        console.log(notes);
                        res.send({status:0,data:notes});
                    }
                })
            }
        });
    }).catch(function () {
        res.send({status:1,errorMsg:'数据库异常'});
    });
});
/*新增note*/
router.post('/note/create',function (req,res,next) {
    if(!req.session.user){
        return res.send({status:1,errorMsg: '请先登录'})
    }
    if(!req.body.note){
        return res.send({status:1,errorMsg:"内容不能为空"})
    }
    var uid = req.session.user.id;
    var note = req.body.note;
    Note.create({text:note,uid:uid}).then(function () {
        res.send({status:0})
    }).catch(function () {
        res.send({status:1,errorMsg:'数据库异常或者你没有权限'});
    })
});
/*修改note*/
router.post('/note/edit',function (req,res,next) {
    if(! req.session.user)
    {
        return res.send({status: 1,errorMsg: "请先登录"})
    }
    var noteId=req.body.id;
    var note=req.body.note;
    var uid=req.session.user.id;
    Note.update({text:note},{where:{id:noteId,uid:uid}}).then(function (lists) {
        console.log("lists");
        console.log(lists);
         res.send({status:0})
    }).catch(function () {
        res.send({status:1,errorMsg:'数据库异常或者你没有权限'})
    });
});

/*删除note*/
router.post("/note/delete",function (req,res,next) {
    if(!req.session.user){
        return res.send({status:1,errorMsg: '请先登录'})
    }
    var noteId=req.body.id;
    var uid=req.session.user.id;
    Note.destroy({where:{id:noteId,uid:uid}}).then(function () {
        res.send({status:0})
    }).catch(function () {
        res.send({status:1})
    })
});
module.exports = router;

