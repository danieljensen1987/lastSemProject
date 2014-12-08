var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({
    _id: String,
    fName: String,
    lName: String,
    address: String,
    city: String,
    zip: Number,
    phone: Number,
    email: String,
    dailyPoints: Number
});

var TeacherSchema = mongoose.Schema({
    _id: String,
    fName: String,
    lName: String,
    address: String,
    city: String,
    zip: Number,
    phone: Number,
    email: String
});

var SemesterSchema = mongoose.Schema({
    _id: String,
    sDate: String,
    eDate: String
});

var ClasseSchema = mongoose.Schema({
    _id: String,
    students: [{ type: String, ref: 'students' }],
    teachers: [{ type: String, ref: 'teachers' }],
    semester: { type: String, ref: 'semesters' }
});

var PeriodSchema = mongoose.Schema({
    _id: String,
    description: String,
    classes: [{ type: String, ref: 'classes' }],
    sDate: String,
    eDate: String,
    maxPoints: Number,
    requiredPoints: Number
});

var TaskSchema = mongoose.Schema({
    _id: String,
    taskDetails: { type: String, ref: 'taskDetails' },
    student: { type: String, ref: 'students' },
    points: Number
});

var TaskDetailSchema = mongoose.Schema({
    _id: String,
    description: String,
    period: { type: String, ref: 'periods' }

});

var DailyPointsSchema = mongoose.Schema({
    _id: String,
    period: { type: String, ref: 'periods'},
    student: { type: String, ref: 'students'},
    dailyPoints: [Number]
});


exports.StudentModel = mongoose.model('students', StudentSchema);
exports.TeachertModel = mongoose.model('teachers', TeacherSchema);
exports.SemesterModel = mongoose.model('semesters', SemesterSchema);
exports.ClasseModel = mongoose.model('classes', ClasseSchema);
exports.PeriodModel = mongoose.model('periods', PeriodSchema);
exports.TaskModel = mongoose.model('tasks', TaskSchema);
exports.TaskDetailModel = mongoose.model('taskDetails', TaskDetailSchema);
exports.DailyPointsModel = mongoose.model('dailyPoints', DailyPointsSchema);