var express = require('express');
var router = express.Router();
var mongoInterface = require('../model/mongoInterface');

router.get('/getMyClasses/:teacherid', function(req, res) {
    var teacherId = req.params.teacherid;
    mongoInterface.getMyClasses(teacherId, function (err, classes) {
        if(err) res.send(err);
        res.send(classes);
    });
});

router.get('/getDailyPointsByPeriod/:periodid', function(req, res){
    var periodId = req.params.periodid;
    mongoInterface.getDailyPointsByPeriod(periodId, function(err, dailyPoints){
        if(err) res.send(err);
        res.send(dailyPoints);
    });
});

router.get('/getStudentsDailyPoints/:studentid/:periodid', function(req, res){
    var studentId = req.params.studentid;
    var periodId = req.params.periodid;
    mongoInterface.getStudentsDailyPoints(studentId, periodId, function(err, dailyPoints){
        if(err) res.send(err);
        res.send(dailyPoints);
    });
});

router.get('/getPeriodsByClassId/:classid', function(req, res){
    var classId = req.params.classid;
    mongoInterface.getPeriodsByClassId(classId, function(err, periodByClass){
        if(err) res.send(err);
        res.send(periodByClass);
    });
});

router.post('/updateDailyPoints/', function(req, res) {
    var studentsId = req.body._id;
    var dailyPoints = req.body.dailyPoints;
    mongoInterface.updateDailyPoints(studentsId,dailyPoints, function (err, student) {
        if(err) res.send(err)
        res.send(student)
    });
});
router.get('/removeStudentFromClass/:studentid', function(req, res) {
    var studentsId = req.params.studentid;
    mongoInterface.removeStudentFromClass(studentsId, function (err, classe) {
        if(err) res.send(err)
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
router.post('/updatePeriod', function (req, res) {
    mongoInterface.updatePeriod(req.body, function (err, period) {
        if(err) res.send(err);
        res.send(period);
    })
});
router.post('/addTaskDetails', function (req, res) {
    mongoInterface.addTaskDetails(req.body, function (err, taskDetails) {
        if(err) res.send(err);
        res.send(taskDetails);
    })
});
router.post('/addTask', function (req, res) {
    mongoInterface.addTask(req.body, function (err, task) {
        if(err) res.send(err);
        res.send(task);
    })
});
router.post('/addStudent', function (req, res) {
    mongoInterface.addStudent(req.body, function (err, student) {
        if(err) res.send(err);
        res.send(student);
    })
});

module.exports = router;

