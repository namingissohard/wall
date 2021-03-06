var db = require('../conf/db')
var fs = require('fs')
var assert = require('assert');
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: 'emmm',
            msg: '报错了emmmm'
        })
    } else {
        res.json(ret)
    }
}
module.exports = {
    getAllWallList: function (req, res, next) {
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
    addWall: function (req, res, next) {
        var params = req.body
        var insertOptions = {
            name: params.name,
            content: params.content,
            head: 'https://imgsa.baidu.com/forum/pic/item/6059252dd42a28345099e49552b5c9ea15cebf75.jpg',
            create_at: new Date()
        }
        db.insertOne('wall', insertOptions, function (err, result) {
            assert.equal(err, null);
            jsonWrite(res, err || result)
        })

    },
    deleteWall: function (req, res, next) {
        var _id = req.body.commentId
        db.deleteById('wall', _id, function (err, result) {
            assert.equal(err, null);
            jsonWrite(res, err || result)
        })
    },
    returnFile: function (req, res, next) {
        let myPath = './test1.xlsx'
        fs.exists(myPath, function (exist) {
            if (exist) {
                var fileStream = fs.createReadStream(myPath)
                fileStream.on("data", (chunk) => res.write(chunk, "binary"))
                fileStream.on("end", function () {
                    res.end()
                })
            } else {
                console.log(3)
                res.json('emmmm')
            }
        })
    }
}