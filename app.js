const express = require('express');
const validation = require ('./validation.js');
const controller = require ('./controller.js');

const app=express();
app.use(express.json());

app.get('/createdb', controller.createdb);

//For login/signup
app.get('/signup',validation.signup,controller.signup);
app.get('/login',validation.login,controller.login);
app.get("/loginaccesstoken",controller.loginUsingAccessToken);

//For Posts:-
app.get('/createtableforpost',controller.createPostTable);
app.get('/createcommenttable',controller.createCommentTable);
app.get('/createpost',controller.createPost);
app.get('/delete:id',controller.deleteUsingID);
app.get('/liked:id',controller.likeOnPost);
app.get('/comment:id',controller.commentOnPost);
app.get('/displaycomment:id',controller.displayComment);
app.post('/uploadImage',validation.uploadImage,controller.uploadImage);
app.post('/fetchImage',validation.fetchImage,controller.fetchImage);



app.listen('5000',()=>{
	console.log('Server started');
});