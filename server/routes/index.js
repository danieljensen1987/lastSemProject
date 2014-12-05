var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var http = require('http');
var request = require('request');
var jpa = require('../model/jpaInterface');
var bcrypt = require('bcryptjs');

router.get('/', function(req, res) {
    res.redirect("app/index.html")
});


router.post('/authenticate', function (req, res) {
    var saltedPass = "";
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err)console.log("error: " +err);
            saltedPass = hash;

            var json = {
                "username": req.body.username,
                "password": req.body.password
            };

            jpa.login('/login', json, function (error, data) {
                if (error){
                    res.status(401).send('Invalid Username or Password');
                    return;
                }

                bcrypt.compare(req.body.password, data.password, function(err, result) {
                    if (result){


                        var profile = {
                            username: req.body.username,
                            role: data.rolle
                        };

                        switch (data.rolle){
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
                    } else{
                        res.status(401).send('Invalid Username or Password');
                    }
                });
            });
        });
    });
});

module.exports = router;
