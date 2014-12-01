var mongoose = require( 'mongoose' );

/*

Note:
To this test project as it is:

Start your MongoDB database.
Start mongo.exe and do:
  use testdb
  db.testusers.insert({userName : "Lars", email :"lam@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Henrik", email :"hsty@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Tobias", email :"tog@cphbusiness.dk",pw: "test",created : new Date()})
  db.testusers.insert({userName : "Anders", email :"aka@cphbusiness.dk",pw: "test",created : new Date()})

*/
var dbURI;

//This is set by the backend tests
if( typeof global.TEST_DATABASE != "undefined" ) {
  dbURI = global.TEST_DATABASE;
}
else{
  //dbURI = 'mongodb://localhost/studypoints';
  dbURI = 'mongodb://test:test@ds053380.mongolab.com:53380/studypoints'
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  global.mongo_error = "Not Connected to the Database";
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
//
//
//var SemesterSchema = mongoose.Schema({
//  _id: Number,
//  name: String,
//  description: String
//});
//
//exports.SemesterModel = mongoose.model('semesters', SemesterSchema);
//
//var ClasseSchema = mongoose.Schema({
//  _id: Number,
//  className: String,
//  periods: [{ type: Number, ref: 'periods' }],
//  users: [{ type: Number, ref: 'users' }],
//  semester: { type: Number, ref: 'semesters' }
//});
//
//exports.ClasseModel = mongoose.model('classes', ClasseSchema);
//
//var TaskSchema = mongoose.Schema({
//  _id: Number,
//  taskDetails: { type: Number, ref: 'taskDetails' },
//  user: { type: Number, ref: 'users' },
//  points: Number
//});
//
//exports.TaskModel = mongoose.model('tasks', TaskSchema);
//
//var TaskDetailSchema = mongoose.Schema({
//  _id: Number,
//  taskName: String,
//  description: String
//});
//
//exports.TaskDetailModel = mongoose.model('taskDetails', TaskDetailSchema);
//
//var UserDetailSchema = mongoose.Schema({
//  _id: Number,
//  fName: String,
//  lName: String,
//  address: String,
//  city: String,
//  zip: String,
//  email: String,
//  phone: String
//});
//
//exports.UserDetailModel = mongoose.model('userDetails', UserDetailSchema);
//
//var UserSchema = mongoose.Schema({
//  _id: Number,
//  userName: String,
//  roleName: String,
//  userDetails: {type: String, ref: 'userDetails'}
//});
//
//exports.UserModel = mongoose.model('users', UserSchema);
//
//var PeriodSchema = mongoose.Schema({
//  _id: Number,
//  periodName: String,
//  sDate: String,
//  eDate: String,
//  description: String,
//  tasks: [{ type: Number, ref: 'tasks' }],
//  users: [{ type: Number, ref: 'users' }]
//});
//
//exports.PeriodModel = mongoose.model('periods', PeriodSchema);

//var SPTSchema = new mongoose.schema({
//  semester:[{semesterName: {type: String, unique: true},
//    sSDate: date(),
//    eSDate: date(),
//    periode: [String],
//    students: [String]}],
//  periode:[{periodeName: String,
//    sPDate: date(),
//    ePDate: date(),
//    task: [String]}],
//  task:[{taskName: String,
//    description: String,
//    maxpoints: Number}]
//});
//
//exports.SPTModel = mongoose.model('SPT', SPTSchema, "SPT");

//var pointsSchema = new mongoose.schema({
//    antal: number
//});

//exports.PointModel = mongoose.model('Points', pointsSchema, "points");
