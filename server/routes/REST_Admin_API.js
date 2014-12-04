var express = require('express');
var router = express.Router();
var request = require('request');
var model = require('../model/model');

router.get('/students', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }

    model.StudentModel.find({})
        .exec(function (err, users) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(users));
        });
});
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
router.post('/students/', function(req, res) {
    var id = req.body._id;
    var dailyPoints = req.body.dailyPoints;

    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    model.StudentModel.findOneAndUpdate({_id: id},{$set:{dailyPoints:dailyPoints}},{new:true})
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

router.get('/teachers', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }

    model.TeachertModel.find({})
        .exec(function (err, users) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(users));
        });
});
router.get('/teachers/:userid', function(req, res) {
    var userId = req.params.userid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }


    model.TeachertModel.find({_id: userId})
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

router.get('/semesters', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }


    model.SemesterModel.find({})
        .exec(function (err, semester) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(semester));
        });
});
router.get('/semesters/:semesterid', function(req, res) {
    var semesterId = req.params.semesterid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }


    model.SemesterModel.find({_id:semesterId})
        .exec(function (err, semester) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(semester));
        });
});

router.get('/classes', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    model.ClasseModel.find({})
        .populate('students')
        .exec(function (err, classes) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(classes));
        });
});
router.get('/classesById/:classid', function(req, res) {
    var classId = req.params.classid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }


    model.ClasseModel.find({_id:classId})
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
router.get('/classesByTeacherId/:teacherid', function(req, res) {
    var teacherId = req.params.teacherid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    model.ClasseModel.find({teachers:teacherId})
        .populate('students')
        .exec(function (err, classes) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(classes));
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
router.get('/classesBySemesterId/:semesterid', function(req, res) {
    var semesterid = req.params.semesterid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }
    model.ClasseModel.find({semester:semesterid})
        .populate('semester')
        .populate('teachers')
        .populate('students')
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

router.get('/periods', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }


    model.PeriodModel.find({})
        .exec(function (err, periods) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(periods));
        });
});
router.get('/periodsById/:periodid', function(req, res) {
    var periodId = req.params.periodid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }


    model.PeriodModel.find({_id:periodId})
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

router.get('/tasks', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }


    model.TaskModel.find({})
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
router.get('/tasksById/:taskid', function(req, res) {
    var taskId = req.params.taskid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }


    model.TaskModel.find({_id:taskId})
        .exec(function (err, task) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(task));
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

router.get('/taskDetail', function(req, res) {
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }


    model.TaskDetailModel.find({})
        .exec(function (err, details) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(details));
        });
});
router.get('/taskDetail/:detailid', function(req, res) {
    var detailId = req.params.detailid;
    if(typeof global.mongo_error !== "undefined"){
        res.status(500);
        res.end("Error: "+global.mongo_error+" To see a list of users here, make sure you have started the database and set up some test users (see model-->db.js for instructions)");
        return;
    }


    model.TaskDetailModel.find({_id:detailId})
        .exec(function (err, details) {
            if (err) {
                res.status(err.status || 400);
                res.end(JSON.stringify({error: err.toString()}));
                return;
            }
            res.header("Content-type","application/json");
            res.end(JSON.stringify(details));
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

