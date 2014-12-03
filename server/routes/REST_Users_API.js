var express = require('express');
var router = express.Router();
var request = require('request');
var model = require('../model/model');


router.get('/students/:userid', function(req, res) {
    var userId = req.params.userid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    model.StudentModel.find({_id: userId})
        .exec(function (err, user) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(user));
        });
});

router.get('/classesByUserId/:userid', function(req, res) {
    var userId = req.params.userid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    model.ClasseModel.find({students:userId})
        .populate('semester')
        .exec(function (err, classe) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(classe));
        });
});

router.get('/periodsByClassId/:classid', function(req, res) {
    var classId = req.params.classid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    model.PeriodModel.find({classes:classId})
        .exec(function (err, period) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(period));
        });
});

router.get('/tasksByUserId/:studentid', function(req, res) {
    var studentId = req.params.studentid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    model.TaskModel.find({student:studentId})
        .populate('taskDetails')
        .exec(function (err, tasks) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(tasks));
        });
});

router.post('/change', function(req, res) {
    var options = {
        uri: 'http://localhost:9191/user',
        method: 'PUT',
        json: {
            "userName": req.body.userName,
            "newPassword": req.body.newPassword,
            "currentPassword": req.body.currentPassword
        }
    };
    request(options, function (error, response, body) {
        if (error){
            res.status(401).send('Wrong user or password');
        }
        res.send(body);
    });
});

module.exports = router;

