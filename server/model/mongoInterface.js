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

exports.getMyProfile = getMyProfile;
exports.getMyClass = getMyClass;
exports.getMyPeriods = getMyPeriods;
exports.getMyTasks = getMyTasks;

exports.getMyClasses = getMyClasses;
exports.updateDailyPoints = updateDailyPoints;
exports.removeStudentFromClass = removeStudentFromClass;