var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient;
var dataBaseUrl = 'mongodb://localhost:27017';
//连接数据库
function _connect(callback){
    client = new MongoClient(dataBaseUrl)
    client.connect(function(err, client){
        if(err){
            console.log("数据库连接失败")
        }else{
            var db = client.db("node")
            callback(db)
            client.close()
        }
    })
}

module.exports = {
    /***********************插入*******************************/
    //插入一条记录
    insertOne(collection, insertObj, callback){
        _connect(function(db){
            db.collection(collection).insertOne(insertObj, function(err, result){
                callback(err, result)
            })
        })
    },
    //插入多条记录
    /*
    * collection:插入的集合，
    * insertArr:插入的文档
    * callback:回调函数。通过该函数返回执行的结果
    */
    insertMany(collection, insertArr, callback){
        _connect(function(db){
            db.collection(collection).insertMany(insertArr, function(err, result){
                callback(err, result)
            })
        })
    },
    /*********************查找**********************************/
    //根据条件查找记录数
    count(collection, queryObj){
        _connect(function(db){
            db.collection(collection).count(queryObj).then(function(err, count){
                callback(err, count)
            })
        })
    },
    //查找多条记录
    /*
    * collection：集合
    * queryobj:
    *   whereObj:条件，默认是{}
    *   sortObj:排序，默认是{}
    *   limit:显示提定条数,默认是0
    *   skip:跳过指定条数，默认是0
    */
    findMany(collection, queryObj ,callback){
        queryObj.whereObj = queryObj.whereObj || {}
        queryObj.sortObj = queryObj.sortObj || {}
        queryObj.limit = queryObj.limit || 0
        queryObj.skip = queryObj.skip || 0
        _connect(function(db){
            db.collection(collection)
                .find(queryObj.whereObj)
                .sort(queryObj.sortObj)
                .limit(queryObj.limit)
                .skip(queryObj.skip)
                .toArray(function(err, result){
                    if(err){
                        console.log(err, 233)
                    }
                    else{
                        callback(err, result)
                    }
                })
        })
    },
    //查找一条记录
    findOne(collection, queryObj ,callback){
        _connect(function(db){
            db.collection(collection).findOne(queryObj,function(err, result){
                callback(err, result)
            })
        })
    },
    /*********************修改******************************************/
    //修改一条记录
    updateOne(collection, whereObj, overObj, callback){
        _connect(function(db){
            db.collection(collection).updateOne(whereObj, overObj, function(err, result){
                callback(err, result)
            })
        })
    },
    //根据id修改一条记录
    updateById(collection, _id, overObj, callback){
        _connect(function(db){
            db.collection(collection).updateOne({_id: mongodb.ObjectId(_id)}, overObj, function(err, result){
                callback(err, result)
            })
        })
    },
    //修改多条记录
    updateMany(collection, whereObj, overObj, callback){
        _connect(function(db){
            db.collection(collection).updateMany(whereObj, overObj, function(err, result){
                callback(err, result)
            })
        })
    },
    /**********************删除**************************************/
    //删除一条记录
    deleteOne(collection, whereObj, callback){
        _connect(function(db){
            db.collection(collection).deleteOne(whereObj, function(err, result){
                callback(err, result)
            })
        })
    },
    //根据id删除一条记录
    deleteById(collection, _id, callback){
        _connect(function(db){
            db.collection(collection).deleteOne({_id: mongodb.ObjectId(_id)}, function(err, result){
                callback(err, result)
            })
        })
    },
    //删除多条记录
    deleteMany(collection, whereObj, callback){
        _connect(function(db){
            db.collection(collection).deleteMany(whereObj, function(err, result){
                callback(err, result)
            })
        })
    }
}