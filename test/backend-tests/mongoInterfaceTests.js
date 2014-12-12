global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";
//global.SKIP_AUTHENTICATION = true;  //Skip security

var should = require("should");
var app = require("../../server/app");
var http = require("http");
var testPort = 9999;
var testServer;
var mongoose = require("mongoose");
var mongoInterface = require('../../server/model/mongoInterface');

describe('Mongo Interface Tests', function () {
  before(function (done) {
    testServer = app.listen(testPort, function () {
      console.log("Server is listening on: " + testPort);
      done();
    })
    .on('error',function(err){
        console.log(err);
      });
  });

  after(function(){
    mongoose.connection.db.dropDatabase();
    testServer.close();
  });
  //ADDING
  it("Should Add a student", function (done) {
    var s1 = {_id:"s1",fName:"aa",lName: "bb"};
    mongoInterface.addStudent(s1, function (err, student) {
      student._id.should.equal('s1');
      student.fName.should.equal('aa');
      done();
    });
  });
  it("Should Add a teacher", function (done) {
    var t1 = {_id:"t1",fName:"cc",lName: "dd"};
    mongoInterface.addTeacher(t1, function (err, student) {
      student._id.should.equal('t1');
      student.fName.should.equal('cc');
      done();
    });
  });
  it("Should Add a class with 1 student and 1 teacher", function (done) {
    var c1 = {_id:'c1',teachers:['t1'],students:['s1']};
    mongoInterface.addClass(c1, function (err, classe) {
      classe._id.should.equal('c1');
      classe.teachers[0].should.equal('t1');
      classe.students[0].should.equal('s1');
      done();
    });
  });
  it("Should Add a period", function (done) {
    var p1 = {_id:'p1',classes:['c1'],sDate:'2014-07-01',eDate:'2014-07-30'};
    mongoInterface.addPeriod(p1, function (err, period) {
      period._id.should.equal('p1');
      done();
    });
  });
  it("Should Add DailyPoints with a student and period", function (done) {
    var d1 = {period:'p1',student:'s1',dailyPoints:[true,true,false]};
    mongoInterface.addDailyPoints(d1, function (err, dailyPoints) {
      dailyPoints.period.should.equal('p1');
      dailyPoints.student.should.equal('s1');
      dailyPoints.dailyPoints.length.should.equal(3);
      dailyPoints.dailyPoints[0].should.equal(true);
      dailyPoints.dailyPoints[1].should.equal(true);
      dailyPoints.dailyPoints[2].should.equal(false);
      done();
    });
  });
  //Student
  it("Should Find a student's profile", function (done) {
    mongoInterface.getMyProfile('s1',function (err, student) {
      student[0]._id.should.equal('s1');
      done();
    });
  });
  it("Should Find a student's class", function (done) {
    mongoInterface.getMyClass('s1',function (err, classe) {
      classe[0]._id.should.equal('c1');
      done();
    });
  });
  it("Should Find a student's periods", function (done) {
    mongoInterface.getMyPeriods('c1',function (err, periods) {
      periods[0]._id.should.equal('p1');
      done();
    });
  });
  it("Should Find a student's dailyPoints", function (done) {
    mongoInterface.getMyDailyPoints('s1',function (err, dailyPoints) {
      dailyPoints[0].dailyPoints.length.should.equal(3);
      dailyPoints[0].dailyPoints[0].should.equal(true);
      dailyPoints[0].dailyPoints[1].should.equal(true);
      dailyPoints[0].dailyPoints[2].should.equal(false);
      done();
    });
  });
  //Teacher
  it("Should Find teacher's classes", function (done) {
    mongoInterface.getMyClasses('t1', function (err, classe) {
      classe[0]._id.should.equal('c1');
      classe[0].students.length.should.equal(1);
      classe[0].students[0].fName.should.equal('aa');
      done();
    });
  });
  it("Should Find periods by class", function (done) {
    mongoInterface.getMyPeriods('c1', function (err, periods) {
      periods[0]._id.should.equal('p1');
      done();
    });
  });
  it("Should Find DailyPoints by period", function (done) {
    mongoInterface.getDailyPointsByPeriod('p1', function (err, dailyPoints) {
      dailyPoints[0].period.should.equal('p1');
      dailyPoints[0].student._id.should.equal('s1');
      dailyPoints[0].student.fName.should.equal('aa');
      dailyPoints[0].dailyPoints.length.should.equal(3);
      dailyPoints[0].dailyPoints[0].should.equal(true);
      dailyPoints[0].dailyPoints[1].should.equal(true);
      dailyPoints[0].dailyPoints[2].should.equal(false);
      done();
    });
  });
  it("Should Update a student's DailyPoints", function (done) {
    mongoInterface.updateStudentsDailyPoints('s1','p1',[false,false,true], function (err, dailyPoints) {
      dailyPoints.dailyPoints[0].should.equal(false);
      dailyPoints.dailyPoints[1].should.equal(false);
      dailyPoints.dailyPoints[2].should.equal(true);
      done();
    });
  });


});
