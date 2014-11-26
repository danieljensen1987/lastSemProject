/**
 * Created by David on 26-11-2014. Et forsøg på noget
 */

var express = require('express');
var router = express.Router();
var model = require('..server/routes/semester');
var modelMongo = require('..server/model/db');


router.get('/', function(req, res) {
    modelMongo.connect();
    model.SPTModel.find({}, function (err, semester) {
        if (err){
            res.render('error', { message: err, title: 'Error' });
        } else {
            res.render('semester', { semester: semester.sort(), title: 'Semester' });
        }
        modelMongo.close();
    })
});

router.get('/:customerId', function (req, res) {
    var customerId = req.params.customerId;
    modelMongo.connect();

    model.OrderModel.find({customer: customerId})
        .populate('customer')
        .exec(function(err, details) {
            if (err){
                res.render('error', { message: err, title: 'Error' });
            } else {
                res.render('customerdetails', { details: details.sort(sortById), title: 'Details For '});
            }
            modelMongo.close();
        });
});