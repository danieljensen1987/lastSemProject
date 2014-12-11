var model = require('../model/model');

//what students can do
function getMyProfile(userId, callback){
    model.StudentModel.find({_id: userId})
        .exec(function (err, user) {
            if (err) callback(err);
            callback(null,user);
        });
}
function getMyClass(studentId, callback){
    model.ClasseModel.find({students:studentId})
        .populate('semester')
        .exec(function (err, classes) {
            if (err) callback(err);
            callback(null, classes);
        });
}
function getMyPeriods(classId, callback){
    model.PeriodModel.find({classes:classId})
        .exec(function (err, periods) {
            if (err) callback(err);
            callback(null, periods)
        });
}
function getMyTasks(studentId, callback){
    model.TaskModel.find({student:studentId})
        .populate('taskDetails')
        .exec(function (err, tasks) {
            if (err) callback(err);
            callback(null, tasks);
        });
}
function getMyDailyPoints(studentId, callback){
    model.DailyPointsModel.find({student:studentId})
        .exec(function (err, dailyPoints){
            if (err) callback(err);
            callback(null,dailyPoints);
        })

}

//what teachers can do
function getMyClasses(teacherId, callback){
    model.ClasseModel.find({teachers:teacherId})
        .populate('students')
        .exec(function (err, classes) {
            if (err) callback(err);
            callback(null,classes);
        });
}
function getPeriodsByClassId(classId, callback){
    model.PeriodModel.find({classes:classId})
        .exec(function(err, periods){
            if(err) callback(err);
            callback(null,periods);
        });
}
function getDailyPointsByPeriod(periodid, callback){
    model.DailyPointsModel.find({period:periodid})
        .populate('student')
        .exec(function (err, dailyPoints){
            if (err) callback(err);
            callback(null,dailyPoints);
        })

}
//function getStudentsDailyPoints(studentId, period, callback){
//    model.DailyPointsModel.find({student:studentId, period:period})
//        .exec(function (err, dailyPoints){
//            if (err) callback(err);
//            callback(null,dailyPoints);
//        })
//
//}
function updateStudentsDailyPoints(studentId, period, points, callback){
    model.DailyPointsModel.findOneAndUpdate({student:studentId, period:period},{$set:{dailyPoints:points}},{new:true})
        .exec(function (err, dailyPoints){
            if (err) callback(err);
            callback(null,dailyPoints);
        })

}
function removeStudentFromClass(studentId, callback){
    model.ClasseModel.findOneAndUpdate({students:studentId},{$pull:{students:studentId}})
        .exec(function (err, data) {
            if(err) callback(err);
            callback(null,data)
        })
}

//what admins can do
function getSemesters(callback){
    model.SemesterModel.find()
        .exec(function (err, semesters) {
            if(err) callback(err);
            callback(null, semesters);
        })
}
function getClasses(callback){
    model.ClasseModel.find()
        .exec(function (err, classes) {
            if(err) callback(err);
            callback(null, classes);
        })
}
function getPeriods(callback){
    model.PeriodModel.find()
        .exec(function (err, periods) {
            if(err) callback(err);
            callback(null, periods);
        })
}
function getStudents(callback){
    model.StudentModel.find()
        .exec(function (err, students) {
            if(err) callback(err);
            callback(null, students);
        })
}
function getTeachers(callback){
    model.TeacherModel.find()
        .exec(function (err, teachers) {
            if(err) callback(err);
            callback(null, teachers);
        })
}

function addClass(classe, callback){
    var json = new model.ClasseModel(classe);
    json.save(function(err,classes){
        if (err) callback(err);
        callback(null,classes)
    });

}
function updateClass(classe, callback){
    model.ClasseModel.findOneAndUpdate({_id:classe._id}, {$set:classe}, {new: true}, function(err, classe) {
        if (err) callback(err);
        callback(null, classe);
    });
}
function addPeriod(period, callback){
    var json = new model.PeriodModel(period);
    json.save(function(err,periods){
        if(err) callback(err);
        callback(null,periods)
    });
}
function addDailyPoints(dailyPoints, callback){
    var json = new model.DailyPointsModel(dailyPoints);
    json.save(function(err, dailyPoints){
        if(err) callback(err);
        callback(null, dailyPoints)
    });
}
function addStudent(student, callback){
    var json = new model.StudentModel(student);
    json.save(function(err,student){
        if(err) callback(err);
        callback(null,student)
    });
}
function addTeacher(teacher, callback){
    var json = new model.TeacherModel(teacher);
    json.save(function(err,teacher){
        if(err) callback(err);
        callback(null,teacher)
    });
}



exports.getMyProfile = getMyProfile;
exports.getMyClass = getMyClass;
exports.getMyPeriods = getMyPeriods;
exports.getMyTasks = getMyTasks;
exports.getMyDailyPoints = getMyDailyPoints;

exports.getSemesters = getSemesters;
exports.getClasses = getClasses;
exports.getPeriods = getPeriods;
exports.getStudents = getStudents;
exports.getTeachers = getTeachers;

exports.getMyClasses = getMyClasses;
exports.getPeriodsByClassId = getPeriodsByClassId;
exports.getDailyPointsByPeriod = getDailyPointsByPeriod;
//exports.getStudentsDailyPoints = getStudentsDailyPoints;
exports.updateStudentsDailyPoints = updateStudentsDailyPoints;
//exports.updateDailyPoints = updateDailyPoints;
exports.removeStudentFromClass = removeStudentFromClass;

exports.addClass = addClass;
exports.updateClass = updateClass;
exports.addPeriod = addPeriod;
exports.addDailyPoints = addDailyPoints;
//exports.updatePeriod = updatePeriod;
//exports.addTaskDetails = addTaskDetails;
//exports.addTask = addTask;
exports.addStudent = addStudent;
exports.addTeacher = addTeacher;
