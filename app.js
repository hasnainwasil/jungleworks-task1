const express = require('express');
const validation = require ('./validation.js');
const controller = require ('./controller.js');

const app=express();
app.use(express.json());

app.get('/createdb', controller.createdb);

//For login/signup
app.get('/createtableforlogin', controller.createapi);
app.get('/signup',validation.signup,controller.signup);
app.get('/login',validation.login,controller.login);
app.get("/loginaccesstoken",controller.loginaccesstoken);

//For Posts:-
app.get('/createtableforpost',controller.createtablepost);
app.get('/createcommenttable',controller.createcommenttable);
app.get('/createpost',controller.createpost);
app.get('/delete:id',controller.deleteid);
app.get('/liked:id',controller.liked);
app.get('/comment:id',controller.comment);
app.get('/displaycomment:id',controller.displaycomment);



app.listen('5000',()=>{
	console.log('Server started');
});