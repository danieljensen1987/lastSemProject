var express = require('express');
var router = express.Router();
var request = require('request');
var model = require('../model/model');
var jpa = require('../model/jpaInterface');
var mongoInterface = require('../model/mongoInterface');
var bcrypt = require('bcryptjs');


router.get('/getMyProfile/:userid', function(req, res) {
    var userId = req.params.userid;
    mongoInterface.getMyProfile(userId, function (err, user) {
        if(err){
            res.send(err);
        }
        res.send(user);
    });
});

router.get('/getMyClass/:userid', function(req, res) {
    var userId = req.params.userid;
    mongoInterface.getMyClass(userId, function (err, classe) {
        if (err){
            res.send(err);
        }
        res.send(classe);
    })
});

router.get('/getMyPeriods/:classid', function(req, res) {
    var classId = req.params.classid;
    mongoInterface.getMyPeriods(classId, function(err, periods){
        if (err){
            res.send(err);
        }
        res.send(periods);
    })
});

router.get('/getMyTasks/:studentid', function(req, res) {
    var studentId = req.params.studentid;
    mongoInterface.getMyTasks(studentId, function (err, tasks) {
        if (err){
            res.send(err);
        }
        res.send(tasks);
    })

});


router.post('/changePassword', function(req, res) {
    var newSaltedPass = "";
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
            newSaltedPass = hash;
        });
    });

    var saltedPass = "";
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.currentPassword, salt, function(err, hash) {
            if(err)console.log("error: " +err);
            saltedPass = hash;

            var json = {
                "username": req.body.userName,
                "password": req.body.currentPassword
            };

            jpa.login('/login', json, function (error, data) {
                if (error){
                    res.status(401).send('Invalid Username or Password');
                    return;
                }

                bcrypt.compare(req.body.currentPassword, data.password, function(err, result) {
                    if (result){
                        var json ={
                            "userName": req.body.userName,
                            "newPassword": newSaltedPass,
                            "currentPassword": req.body.currentPassword
                        };


                        jpa.changePassword('/user', json, function (error, data) {
                            if(error){
                                console.log(error);
                                res.status(401).send('Wrong Password');
                            }
                            else{
                                res.send(data)
                            }
                        });
                    } else{
                        console.log(data);
                        res.status(401).send('Invalid Username or Password');
                    }


                });
            });



            //console.log(saltedPass);
            //test();
        });
    });

});

module.exports = router;

