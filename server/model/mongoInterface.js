var model = require('../model/model');

function getMyProfile(userId, callback){
    model.StudentModel.find({_id: userId})
        .exec(function (err, user) {
            if (err) {
                callback(err);
            }
            callback(null,user);
        });
}
function getMyClass(studentId, callback){
    model.ClasseModel.find({students:studentId})
        .populate('semester')
        .exec(function (err, classes) {
            if (err) {
                callback(err);
            }
            callback(null, classes);
        });
}
function getMyPeriods(classId, callback){
    model.PeriodModel.find({classes:classId})
        .exec(function (err, periods) {
            if (err) {
                callback(err);
            }
            callback(null, periods)
        });
}
function getMyTasks(studentId, callback){
    model.TaskModel.find({student:studentId})
        .populate('taskDetails')
        .exec(function (err, tasks) {
            if (err) {
                callback(err);
            }
            callback(null, tasks);
        });
}

function getMyClasses(teacherId, callback){
    model.ClasseModel.find({teachers:teacherId})
        .populate('students')
        .exec(function (err, classes) {
            if (err) {
                callback(err);
            }
            callback(null,classes);
        });
}
function updateDailyPoints(studentId, points, callback){
    model.StudentModel.findOneAndUpdate({_id: studentId},{$set:{dailyPoints:points}},{new:true})
        .exec(function (err, user) {
            if (err) {
                callback(err)
            }
            callback(null,user)
        });
}
function removeStudentFromClass(studentId, callback){
    //db.coll.update({<cond to identify document}, {$pull: {'comments': {'name': <name>}}} )
model.ClasseModel.findOneAndUpdate({students:studentId},{$pull:{students:studentId}})
    .exec(function (err, data) {
        if(err){
            callback(err)
        }
        callback(null,data)
    })
}


function addClass(classId, students, teachers, semester, callback){
    model.ClasseModel.insert({class:classId, students:students, teachers:teachers, semester:semester})
        .exec(function(err,classes){
            if (err){
                callback(err);
            }
            callback(null,classes)
        });

}
function addPeriod(periodId, description, classe, sDate, eDate, maxPoints, requiredPoints, callback){
    model.PeriodModel.insert({period:periodId, description:description, class:classe, sDate:sDate, eDate:eDate,
    maxPoints:maxPoints, requiredPoints:requiredPoints})
        .exec(function(err,periods){
            if(err){
                callback(err);
            }
            callback(null,periods)
        });
}
function addTaskDetails(taskDetailsId, description, period, callback){
    model.TaskDetailModel.insert({taskDetails:taskDetailsId, description:description, period:period})
        .exec(function(err,taskDetails){
            if(err){
                callback(err);
            }
            callback(null,taskDetails)
        });
}
function addTask(taskId, student, taskDetails, points, callback){
    model.TaskModel.insert({task:taskId, student:student, taskDetails:taskDetails, points:points})
        .exec(function(err,task){
            if(err){
                callback(err);
            }
            callback(null,task)
        });

}
function addStudent(studentId, fName, lName, address, city, zip, phone, email, dailyPoints, callback){
    model.StudentModel.insert({student:studentId, firstName:fName, lastName:lName, address:address, city:city,
    zip:zip, phone:phone, email:email, dailyPoints:dailyPoints})
        .exec(function(err,student){
            if(err){
                callback(err);
            }
            callback(null,student)
        });

}





exports.getMyProfile = getMyProfile;
exports.getMyClass = getMyClass;
exports.getMyPeriods = getMyPeriods;
exports.getMyTasks = getMyTasks;

exports.getMyClasses = getMyClasses;
exports.updateDailyPoints = updateDailyPoints;
exports.removeStudentFromClass = removeStudentFromClass;

exports.addClass = addClass;
exports.addPeriod = addPeriod;
exports.addTaskDetails = addTaskDetails;
exports.addTask = addTask;
exports.addStudent = addStudent;