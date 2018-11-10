var express = require('express');
var fs =require('fs')
var router = express.Router();
var wall = require('../mutual/wall');
var comment = require('../mutual/comment')
/* GET home page. */
router.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200); /*让options请求快速返回*/
  }
  else {
    next();
  }
});
router.get('/', function(req, res, next) {
  res.set('cache-control', 'no-cache')
  wall.getAllWallList(req, res, next)
  //瞎玩localStorage
  /*fs.readFile('./aha.html',function(err,content){
    res.writeHead(200, {'content-Type': 'text/html; charset=UTF-8'})
    res.write(content)
    res.end()
  })*/
});
router.post('/createComment', function(req, res, next) {
  wall.addWall(req, res, next)
});
router.post('/returnFile',function(req, res, next){
  wall.returnFile(req, res, next)
})
router.post('/deleteComment', function(req, res, next){
  wall.deleteWall(req, res, next)
})

router.post('/addComment', function(req, res, next){
  comment.addComment(req, res, next)
})
module.exports = router;
