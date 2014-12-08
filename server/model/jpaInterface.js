var http = require('http');
var request = require('request');
var url = 'http://localhost:9191';

function login(path, json, callback) {
    var options = {
        uri: url + path,
        method: 'POST',
        json: {
            'username':json.username,
            'password':json.password
        }
    };
    request(options, function (error, data, body) {
        if(error){
            callback(body);
        }
        callback(null,body);
    });
}

function addUser(path, json, callback) {
    var options = {
        uri: url + path,
        method: 'POST',
        json: json
    };
    request(options, function (error, data, body) {
        if(error){
            callback(body);
        }
        callback(null,body);
    });
}
function changePassword(path, json, callback) {
    var options = {
        uri: url + path,
        method: 'PUT',
        json: {
            'userName':json.userName,
            'newPassword':json.newPassword,
            'currentPassword':json.currentPassword
        }
    };
    request(options, function (error, data, body) {
        console.log(body);
        if(error){
            callback(body);
        }
        callback(null,body);
    });
}

exports.login = login;
exports.addUser = addUser;
exports.changePassword = changePassword;