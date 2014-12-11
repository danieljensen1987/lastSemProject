var express = require('express');
var router = express.Router();
var mongoInterface = require('../model/mongoInterface');
var jpa = require('../model/jpaInterface');
var bcrypt = require('bcryptjs');

router.get('/getMyClasses/:teacherid', function(req, res) {
    var teacherId = req.params.teacherid;
    mongoInterface.getMyClasses(teacherId, function (err, classes) {
        if(err) res.send(err);
        res.send(classes);
    });
});
router.get('/getPeriodsByClassId/:classid', function(req, res){
    var classId = req.params.classid;
    mongoInterface.getPeriodsByClassId(classId, function(err, periodByClass){
        if(err) res.send(err);
        res.send(periodByClass);
    });
});
router.get('/getDailyPointsByPeriod/:periodid', function(req, res){
    var periodId = req.params.periodid;
    mongoInterface.getDailyPointsByPeriod(periodId, function(err, dailyPoints){
        if(err) res.send(err);
        res.send(dailyPoints);
    });
});
//router.get('/getStudentsDailyPoints/:studentid/:periodid', function(req, res){
//    var studentId = req.params.studentid;
//    var periodId = req.params.periodid;
//    mongoInterface.getStudentsDailyPoints(studentId, periodId, function(err, dailyPoints){
//        if(err) res.send(err);
//        res.send(dailyPoints);
//    });
//});
router.post('/updateStudentsDailyPoints', function(req, res){
    var studentId = req.body.studentId;
    var periodId = req.body.periodId;
    var dailyPoints = req.body.dailyPoints
    mongoInterface.updateStudentsDailyPoints(studentId, periodId, dailyPoints, function(err, dailyPoints){
        if(err) res.send(err);
        res.send(dailyPoints);
    });
});
router.get('/removeStudentFromClass/:studentid', function(req, res) {
    var studentsId = req.params.studentid;
    mongoInterface.removeStudentFromClass(studentsId, function (err, classe) {
        if(err) res.send(err);
        res.send(classe)
    });
});

router.get('/getSemesters', function (req, res) {
    mongoInterface.getSemesters(function (err, semesters) {
        if(err) res.send(err);
        res.send(semesters)
    })
});
router.get('/getClasses', function (req, res) {
    mongoInterface.getClasses(function (err, classes) {
        if(err) res.send(err);
        res.send(classes)
    })
});
router.get('/getPeriods', function (req, res) {
    mongoInterface.getPeriods(function (err, periods) {
        if(err) res.send(err);
        res.send(periods)
    })
});
router.get('/getStudents', function (req, res) {
    mongoInterface.getStudents(function (err, students) {
        if(err) res.send(err);
        res.send(students)
    })
});
router.get('/getTeachers', function (req, res) {
    mongoInterface.getTeachers(function (err, teachers) {
        if(err) res.send(err);
        res.send(teachers)
    })
});

router.post('/addClass', function (req, res) {
    mongoInterface.addClass(req.body, function (err, classe) {
        if(err) res.send(err);
        res.send(classe);
    })
});
router.post('/updateClass', function (req, res) {
    mongoInterface.updateClass(req.body, function (err, classe) {
        if(err) res.send(err);
        res.send(classe);
    })
});
router.post('/addPeriod', function (req, res) {
    mongoInterface.addPeriod(req.body, function (err, period) {
        if(err) res.send(err);
        res.send(period);
    })
});
router.post('/addDailyPoints', function (req, res) {
    mongoInterface.addDailyPoints(req.body, function (err, dailyPoints) {
        if(err) res.send(err);
        res.send(dailyPoints);
    })
});
router.post('/addUser', function (req, res) {
    var userName = req.body._id;
    var role = req.body.role;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash("test123", salt, function(err, hash) {
            if(err){}
            addToJPA(hash);
        })
    });
    var addToJPA = function(hash){
        var json = {
            "userName":userName,
            "password":hash,
            "role":role
        };

        jpa.addUser('/user', json, function (err, data) {
            if(err){}
            if (data == true){
                switch (role){
                    case 'student':
                        mongoInterface.addStudent(req.body, function (err, student) {
                            if(err) res.send(err);
                            res.send(student);
                        });
                        break;
                    case 'teacher':
                        mongoInterface.addTeacher(req.body, function (err, teacher) {
                            if(err) res.send(err);
                            res.send(teacher);
                        });
                        break;
                    case 'admin':
                        mongoInterface.addTeacher(req.body, function (err, teacher) {
                            if(err) res.send(err);
                            res.send(teacher);
                        });
                        break;
                }
            }
        });
    };
});

module.exports = router;

