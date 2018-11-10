var db = require('../conf/db')
var mongodb = require('mongodb')
var fs = require('fs')
var assert = require('assert');
var jsonWrite = function(res, ret){
    if(typeof ret === 'undefined'){
        res.json({
            code: 'emmm',
            msg: '报错了emmmm'
        })
    }else{
        res.json(ret)
    }
}
module.exports = {
    getAllComments: function (req, res, next) {
        db.findMany('wall', {}, function (err, allWallList) {
            if (err) {
                console.log(err)
            }
            else {
                allWallList.map(wall => {
                    const whereObj = { reply_id: wall._id },
                        sortObj = { create_at: 1 };
                    db.findMany('comment', { whereObj, sortObj }, function (err, allCommentList) {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            allCommentList ? wall.commentList = allCommentList : null
                        }
                    })
                })
                jsonWrite(res, err || allWallList)
                //console.log((allList[0].create_at) instanceof Date)
            }
        })
    },
    addComment: function (req, res, next) {
        var params = req.body
        var insertOptions = {
            name: params.name,
            content: params.content,
            head: 'https://imgsa.baidu.com/forum/pic/item/6059252dd42a28345099e49552b5c9ea15cebf75.jpg',
            create_at: new Date(),
            reply_id: mongodb.ObjectId(params.replyId),
            reply_name: params.replyName
        }
        db.insertOne('comment', insertOptions, function (err, result) {
            assert.equal(err, null);
            jsonWrite(res, err || result)
        })
    },
    deleteComment: function(req, res, next){
        var _id = req.body.commentId
        db.deleteById('comment', _id, function(err, result){
            assert.equal(err, null);
            jsonWrite(res, err||result) 
        })
    },
}