const service = require ('./service.js');

exports.createdb = function (req, res) {
    service.createdb(req,res);
}

exports.signup = function (req, res) {
    service.signup(req,res);
}

exports.login = function (req, res) {
    service.login(req,res);
    service.updateAccessToken(req,res);
}

exports.loginUsingAccessToken = function (req, res) {
    service.loginUsingAccessToken(req,res);
}

//For Posts:-
exports.createPost = function (req, res) {
    service.createPost(req,res);
}

exports.deleteUsingID = function (req, res) {
    service.deleteUsingID(req,res);
}

exports.likeOnPost = function (req, res) {
    service.likeOnPost(req,res);
}

exports.commentOnPost = function (req, res) {
    service.commentOnPost(req,res);
}

exports.displayComment = function (req, res) {
    service.displayComment(req,res);
}

exports.createCommentTable = function (req, res) {
    service.createCommentTable(req,res);
}

exports.createPostTable = function (req, res){
    service.createPostTable(req, res);
}

exports.uploadImage = function (req, res){
    service.uploadImage(req, res);
}

exports.fetchImage = function (req, res){
    service.fetchImage(req, res);
}

