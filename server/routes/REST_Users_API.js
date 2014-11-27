var express = require('express');

var router = express.Router();
var spt = mongo.model(spt);

router.get('/test', function(req, res) {
    res.header("Content-type","application/json");
    res.end('{"msg" : "Test Message, You are logged on as a User since you could fetch this data"}');
});

router.get('/mongo', function(req,res){
    if(typeof  global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: " + global.mongo_error+" ");
        return;
    }
    spt.find({}, function(err, users){
        if(err){
            res.status(err.status ||400);
            res.end(JSON.stringify(({error: err.toString()})));
            return;
        }
        res.header("Content-type", "application/json");
        res.end(JSON.stringify(users));
        console.log(users);

        })

    })
module.exports = router;

