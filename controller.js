const service = require ('./service.js');

exports.createdb = function (req, res) {
    service.createdb(req,res);
}

exports.createapi = function (req, res) {
    service.createapi(req,res);
}

exports.signup = function (req, res) {
    service.signup(req,res);
}

exports.login = function (req, res) {
    service.login(req,res);
}

exports.loginaccesstoken = function (req, res) {
    service.loginaccesstoken(req,res);
}

//For Posts:-
exports.createpost = function (req, res) {
    service.createpost(req,res);
}

exports.deleteid = function (req, res) {
    service.deleteid(req,res);
}

exports.liked = function (req, res) {
    service.liked(req,res);
}

exports.comment = function (req, res) {
    service.comment(req,res);
}

exports.displaycomment = function (req, res) {
    service.displaycomment(req,res);
}

exports.createcommenttable = function (req, res) {
    service.createcommenttable(req,res);
}

exports.createtablepost = function (req, res){
    service.createtablepost(req, res);
}

