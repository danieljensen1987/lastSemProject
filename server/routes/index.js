var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var http = require('http');
var request = require('request');


/* GET home page. */
router.get('/', function(req, res) {
    res.redirect("app/index.html")
});


router.post('/authenticate', function (req, res) {
    var options = {
        uri: 'http://localhost:9191/login',
        method: 'POST',
        json: {
            "username": req.body.username,
            "password": req.body.password
        }
    };

    request(options, function (error, response, body) {
        console.log(body);
        switch (body){
            case 'student':
                var profile = {
                    username: req.body.username,
                    role: "student"
                };
                var token = jwt.sign(profile, require("../security/secrets").secretTokenStudent, { expiresInMinutes: 60*5 });
                res.json({ token: token });
                break;

            case 'teacher':
                var profile = {
                    username: req.body.username,
                    role: "admin"
                };
                var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
                res.json({ token: token });
                break;

            case 'admin':
                var profile = {
                    username: req.body.username,
                    role: "admin"
                };
                var token = jwt.sign(profile, require("../security/secrets").secretTokenAdmin, { expiresInMinutes: 60*5 });
                res.json({ token: token });
                break;

            default:
                res.status(401).send('Invalid Username or Password');
                break;
        }
    });
});

module.exports = router;
