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


/** User SCHEMA **/
/** Replace this Schema with your own(s) **/
/*var usersSchema = new mongoose.Schema({
  userName : String,
  email: {type: String, unique: true},
  pw: String,
  created: { type: Date, default: new Date() }
});
 mongoose.model( 'User', usersSchema,"testusers" );
*/

var usersSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  fullname: {fname: String, lname: String},
  class: String,
  semester: String
});

exports.UserModel = mongoose.model('User', usersSchema, "users");

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
