var fs = require('fs'),
    async = require('async'),
    mongoose = require('mongoose'),
    model = require('./../model/model'),
    dbUrl = "mongodb://test:test@ds053380.mongolab.com:53380/studypoints";
    //dbUrl = "mongodb://localhost/studypoints";

function readData(path) {
    var file = fs.readFileSync(path, 'utf8');
    var lines = file.split(/[\r]?[\n]/);
    var headers = lines[0].split(',');
    var data = JSON.parse(lines[1]);
    var result = data.map(function(e) {
        var res = {};
        for(var i = 0; i < e.length; i++) {
            if(e[i] !== 'NULL')
                res[headers[i]] = e[i];
        }
        return res;
    })
    console.log(path + ": " + result.length);
    return result;
}

function getStudents() {
    return students.map(function(user) {
        return {
            _id: user._id,
            fName: user.fName,
            lName: user.lName,
            address: user.address,
            city: user.city,
            zip: user.zip,
            phone: user.phone,
            email: user.email,
            dailyPoints: user.dailyPoints
        };
    });
}

function getTeachers() {
    return teachers.map(function(user) {
        return {
            _id: user._id,
            fName: user.fName,
            lName: user.lName,
            address: user.address,
            city: user.city,
            zip: user.zip,
            phone: user.phone,
            email: user.email
        };
    });
}

function getSemesters() {
    return semesters.map(function(semester) {
        return {
            _id: semester._id,
            sDate: semester.sDate,
            eDate: semester.eDate
        };
    });
}

function getClasses() {
    return classes.map(function(classe) {
        return {
            _id: classe._id,
            students: classe.students,
            teachers: classe.teachers,
            semester: classe.semester
        };
    });
}

function getPeriods() {
    return periods.map(function(period) {
        return {
            _id: period._id,
            description: period.description,
            classes: period.classes,
            sDate: period.sDate,
            eDate: period.eDate,
            maxPoints: period.maxPoints,
            requiredPoints: period.requiredPoints
        };
    });
}

function getTasks() {
    return tasks.map(function(task) {
        return {
            _id: task._id,
            taskDetails: task.taskDetails,
            student: task.student,
            points: task.points
        };
    })
}

function getTaskDetails() {
    return taskDetails.map(function(taskDetails) {
        return {
            _id: taskDetails._id,
            description: taskDetails.description,
            period: taskDetails.period
        };
    })
}

var students = readData('students.json');
var teachers = readData('teachers.json');
var semesters = readData('semesters.json');
var classes = readData('classes.json');
var periods = readData('periods.json');
var tasks = readData('tasks.json');
var taskDetails = readData('taskDetails.json');

var db = mongoose.connect(dbUrl);
db.connection.once('open', function() {
    console.log("Connected");
});
db.connection.on('error', function(err) {
    console.log(err);
    console.log('Did you remember to start MongodDb?');
});

model.StudentModel.remove({}).exec();
model.TeachertModel.remove({}).exec();
model.SemesterModel.remove({}).exec();
model.ClasseModel.remove({}).exec();
model.PeriodModel.remove({}).exec();
model.TaskModel.remove({}).exec();
model.TaskDetailModel.remove({}).exec();
var done = [0,0,0,0,0,0];

function closeDatabase() {
    db.connection.close();
}

var asyncTasks = [];

function addData(data, dataModel) {
    data.forEach(function(item){
        asyncTasks.push(function(callback){
            var element = new dataModel(item);
            element.save(function(err, period) {
                if(err) console.log(err);
                callback();
            });
        });
    });
}

addData(getStudents(), model.StudentModel);
addData(getTeachers(), model.TeachertModel);
addData(getSemesters(), model.SemesterModel);
addData(getClasses(), model.ClasseModel);
addData(getPeriods(), model.PeriodModel);
addData(getTasks(), model.TaskModel);
addData(getTaskDetails(), model.TaskDetailModel);

async.series(asyncTasks, function(){
    closeDatabase();
});




