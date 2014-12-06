var model = require('../model/model');

//what students can do
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

//what teachers can do
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

//what admins can do
function getSemesters(callback){
    model.SemesterModel.find()
        .exec(function (err, semesters) {
            if(err){
                callback(err);
            }
            callback(null, semesters);
        })
}
function getClasses(callback){
    model.ClasseModel.find()
        .exec(function (err, classes) {
            if(err){
                callback(err);
            }
            callback(null, classes);
        })
}
function getPeriods(callback){
    model.PeriodModel.find()
        .exec(function (err, Periods) {
            if(err){
                callback(err);
            }
            callback(null, periods);
        })
}
function getStudents(callback){
    model.StudentModel.find()
        .exec(function (err, students) {
            if(err){
                callback(err);
            }
            callback(null, students);
        })
}
function getTeachers(callback){
    model.TeachertModel.find()
        .exec(function (err, teachers) {
            if(err){
                callback(err);
            }
            callback(null, teachers);
        })
}

function addClass(classe, callback){
    var json = new model.ClasseModel(classe);
        json.save(function(err,classes){
            if (err){
                callback(err);
            }
            callback(null,classes)
        });

}
function addPeriod(period, callback){
    var json = new model.PeriodModel(period);
        json.save(function(err,periods){
            if(err){
                callback(err);
            }
            callback(null,periods)
        });
}
function addTaskDetails(taskDetails, callback){
    var json = new model.TaskDetailModel(taskDetails);
        json.save(function(err,taskDetails){
            if(err){
                callback(err);
            }
            callback(null,taskDetails)
        });
}
function addTask(task, callback){
    var json = new model.TaskModel(task);
        json.save(function(err,task){
            if(err){
                callback(err);
            }
            callback(null,task)
        });

}
function addStudent(student, callback){
    var json = new model.StudentModel(student);
    json.save(function(err,student){
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

exports.getSemesters = getSemesters;
exports.getClasses = getClasses;
exports.getPeriods = getPeriods;
exports.getStudents = getStudents;
exports.getTeachers = getTeachers;

exports.getMyClasses = getMyClasses;
exports.updateDailyPoints = updateDailyPoints;
exports.removeStudentFromClass = removeStudentFromClass;

exports.addClass = addClass;
exports.addPeriod = addPeriod;
exports.addTaskDetails = addTaskDetails;
exports.addTask = addTask;
exports.addStudent = addStudent;