var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var http = require('http');
var request = require('request');
var jpa = require('../model/jpaInterface');
//var bcrypt = require('bcryptjs');

router.get('/', function(req, res) {
    res.redirect("app/index.html")
});


router.post('/authenticate', function (req, res) {
    // TODO implement this an make jpa return user instead of role
    //var loadHash = "";
    //bcrypt.genSalt(10, function(err, salt) {
    //    bcrypt.hash(req.body.password, salt, function(err, hash) {
    //        loadHash = hash;
    //        console.log(loadHash);
    //        test();
    //    });
    //});
    //var test = function () {
    //    bcrypt.compare(req.body.password, loadHash, function(err, res) {
    //        console.log(loadHash);
    //        console.log(res);
    //    });
    //};

    var json = {
        "username": req.body.username,
        "password": req.body.password
    };

    jpa.login('/login', json, function (error, data) {
        if (error){
            res.status(401).send('Invalid Username or Password');
            return;
        }
        var profile = {
            username: req.body.username,
            role: data
        };

        switch (data){
            case 'student':
                var token = jwt.sign(profile, require("../security/secrets").secretTokenStudent, { expiresInMinutes: 60*5 });
                res.json({ token: token });
                break;
            case 'teacher':
                // teacher role is not yet implemented in secrets and tokens - therefor the role is set to admin
                var token = jwt.sign({username: req.body.username, role:'admin'}, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
                res.json({ token: token });
                break;
            case 'admin':
                var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
                res.json({ token: token });
                break;
            default :
                res.status(401).send('Invalid Username or Password');
                break;
        }
    });
    //var options = {
    //    uri: 'http://localhost:9191/login',
    //    method: 'POST',
    //    json: {
    //        "username": req.body.username,
    //        "password": req.body.password
    //    }
    //};
    //
    //request(options, function (error, response, body) {
    //    switch (body){
    //        case 'student':
    //            var profile = {
    //                username: req.body.username,
    //                role: "student"
    //            };
    //            var token = jwt.sign(profile, require("../security/secrets").secretTokenStudent, { expiresInMinutes: 60*5 });
    //            res.json({ token: token });
    //            break;
    //
    //        case 'teacher':
    //            var profile = {
    //                username: req.body.username,
    //                role: "admin"
    //            };
    //            var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
    //            res.json({ token: token });
    //            break;
    //
    //        case 'admin':
    //            var profile = {
    //                username: req.body.username,
    //                role: "admin"
    //            };
    //            var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
    //            res.json({ token: token });
    //            break;
    //
    //        default:
    //            res.status(401).send('Invalid Username or Password');
    //            break;
    //    }
    //});
});

module.exports = router;
