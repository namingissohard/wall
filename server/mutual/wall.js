var db = require('../conf/db')
var fs = require('fs')
var assert = require('assert');
var jsonWrite = function(res, ret){
    if(typeof ret === 'undefined'){
        res.json({
            code: 'emmm',
            msg: '报错了emmmm'
        })
    }else{
        res.set("Content-Type", "application/json")
        res.send(ret)
        console.log(res.body)
    }
}
module.exports = {
    getAllComments:function(req, res, next){
        db.findMany('wall', {}, function(err, allList){
            if(err){
                console.log(err)
            }
            else{
                jsonWrite(res, err|| allList)
                //console.log((allList[0].create_at) instanceof Date)
            }
        })
    },
    addComment: function(req, res, next){
        var params = req.body
        var insertOptions = {           
            name: params.name,
            content: params.content,
            head: 'https://imgsa.baidu.com/forum/pic/item/6059252dd42a28345099e49552b5c9ea15cebf75.jpg',
            create_at: new Date()            
        }
        db.insertOne('wall',insertOptions, function(err, result){
            assert.equal(err, null);
            jsonWrite(res, err||result)      
        })

    },
    returnFile: function(req, res, next){
        let myPath = './test1.xlsx'
        fs.exists(myPath, function(exist){
            if(exist){
                var fileStream = fs.createReadStream(myPath)
                fileStream.on("data",(chunk)=>res.write(chunk, "binary"))
                fileStream.on("end", function(){
                    res.end()
                })
            }else{
                console.log(3)
                res.json('emmmm')
            }
        })
    }
}