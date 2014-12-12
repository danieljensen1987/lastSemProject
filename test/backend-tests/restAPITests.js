global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";
global.SKIP_AUTHENTICATION = true;  //Skip security

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var request = require('request');
var testPort = 9999;
var hostName = 'http://localhost:';
var uri = hostName + testPort;
var testServer;
var mongoose = require("mongoose");
var model = require('../../server/model/model');

describe('REST API for /user', function () {
  //Start the Server before the TESTS
  before(function (done) {

    testServer = app.listen(testPort, function () {
      console.log("Server is listening on: " + testPort);
      done();
    })
    .on('error',function(err){
        console.log(err);
      });
  });

  beforeEach(function(done){
    model.SemesterModel.remove({}, function () {
      var sem1 ={_id:'sem1',sDate:'2014-07-01',eDate:'2014-12-29'};
      var sem2 ={_id:'sem2',sDate:'2014-07-01',eDate:'2014-12-29'};
      var sem3 ={_id:'sem3',sDate:'2014-07-01',eDate:'2014-12-29'};
      model.SemesterModel.create(sem1, function(){
        model.SemesterModel.create(sem2, function () {
          model.SemesterModel.create(sem3, function () {
          })
        })
      })
    });
    model.ClasseModel.remove({}, function () {
      var c1 ={_id:'c1',semester:'sem1',students:[]};
      var c2 ={_id:'c2',semester:'sem2',students:[]};
      var c3 ={_id:'c3',semester:'sem3',students:['s1','s2','s3']};
      model.ClasseModel.create(c1, function(){
        model.ClasseModel.create(c2, function () {
          model.ClasseModel.create(c3, function () {
          })
        })
      })
    });
    model.PeriodModel.remove({}, function () {
      var p1 ={_id:'p1',classes:'c1'};
      var p2 ={_id:'p2',classes:'c1'};
      var p3 ={_id:'p3',classes:'c2'};
      model.PeriodModel.create(p1, function(){
        model.PeriodModel.create(p2, function () {
          model.PeriodModel.create(p3, function () {
          })
        })
      })
    });
    model.DailyPointsModel.remove({}, function () {
      var d1 ={period:'p1',student:'s1', dailyPoints:[0,1,0,1]};
      var d2 ={period:'p2',student:'s1', dailyPoints:[0,1,0]};
      var d3 ={period:'p2',student:'s2', dailyPoints:[1,1,1,1]};
      model.DailyPointsModel.create(d1, function(){
        model.DailyPointsModel.create(d2, function () {
          model.DailyPointsModel.create(d3, function () {
          })
        })
      })
    });
    model.StudentModel.remove({}, function () {
      var s1 ={_id:'s1',fName:'aa'};
      var s2 ={_id:'s2',fName:'bb'};
      var s3 ={_id:'s3',fName:'cc'};
      model.StudentModel.create(s1, function(){
        model.StudentModel.create(s2, function () {
          model.StudentModel.create(s3, function () {
            done();
          })
        })
      })
    });

  });

  after(function(){
    mongoose.connection.db.dropDatabase();
    testServer.close();
  });

  it("Should get 3 Students; aa, bb and cc", function (done) {
    http.get(uri+"/adminApi/getStudents",function(res){
      res.setEncoding("utf8");//response data is now a string
      res.on("data",function(chunk){
        var n = JSON.parse(chunk);
        n.length.should.equal(3);
        n[0].fName.should.equal("aa");
        n[1].fName.should.equal("bb");
        n[2].fName.should.equal("cc");
        done();
      });
    })
  });
  it("Should get 3 Semesters; sem1, sem2 and sem3", function (done) {
    http.get(uri+"/adminApi/getSemesters",function(res){
      res.setEncoding("utf8");//response data is now a string
      res.on("data",function(chunk){
        var n = JSON.parse(chunk);
        n.length.should.equal(3);
        n[0]._id.should.equal("sem1");
        n[1]._id.should.equal("sem2");
        n[2]._id.should.equal("sem3");
        done();
      });
    })
  });
  it("Should get 3 Classes; c1, c2 and c3", function (done) {
    http.get(uri+"/adminApi/getClasses",function(res){
      res.setEncoding("utf8");//response data is now a string
      res.on("data",function(chunk){
        var n = JSON.parse(chunk);
        n.length.should.equal(3);
        n[0]._id.should.equal("c1");
        n[1]._id.should.equal("c2");
        n[2]._id.should.equal("c3");
        done();
      });
    })
  });
  it("Should get 3 Periods; p1, p2 and p3", function (done) {
    http.get(uri+"/adminApi/getPeriods",function(res){
      res.setEncoding("utf8");//response data is now a string
      res.on("data",function(chunk){
        var n = JSON.parse(chunk);
        n.length.should.equal(3);
        n[0]._id.should.equal("p1");
        n[1]._id.should.equal("p2");
        n[2]._id.should.equal("p3");
        done();
      });
    })
  });
});
