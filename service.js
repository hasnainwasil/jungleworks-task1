const mysql = require('mysql');
const md5 = require('md5');
const jwt=require('jsonwebtoken');
const { func } = require('@hapi/joi');

const db=mysql.createConnection({
	host : 'localhost',
	user: 'root',
	password:'',
	database: 'jtable1',
	connectionLimit: 50,
    queueLimit: 0,
    waitForConnection: true,
    port:'8111'
});
var del = db._protocol._delegateError;
db._protocol._delegateError = function(err, sequence){
  if (err.fatal) {
    console.trace('fatal error: ' + err.message);
  }
  return del.call(this, err, sequence);
};
db.connect((err)=>{
	if(err){
		console.log(err);
	}
	console.log('Mysql connected');
});

let date_ob = new Date();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let time= hours + ":" + minutes + ":" + seconds;

function createdb(req,res) {
    let sql= 'CREATE DATABASE jtable1';
	db.query(sql,(err,result)=>{
		if(err) console.log(err);
		console.log(result);
		res.send('database created');  
	});
}

function createapi(req,res) {
    let sql='CREATE TABLE jungle(id int AUTO_INCREMENT,firstname VARCHAR(255),lastname VARCHAR(255),email VARCHAR(255),password VARCHAR(255), PRIMARY KEY(id))';
	db.query(sql,(err,result) => {
		if(err) console.log(err);
		console.log(result);
		res.send('table created');
	});
}

function signup(req,res) {
	//let body = {firstname:'Wasil',lastname:'Hasnian',email:'abcd3@gmail.com',password:'4328978'};
	let body=req.body;
	
	body.password=md5(body.password);
	let sql='INSERT INTO jungle SET ?';
	let query=db.query(sql,body,(err,result)=>{
		if(err) throw err;
		//console.log(result);
		//res.send('New Row Added');
	});
	let sql2='UPDATE jungle SET createdtime=? WHERE email=?';
	let query2=db.query(sql2,[time,body.email],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		res.send('New Row Added & Created Time Added');
	});
}

function login(req,res) {
	//let body= {email:'abcd@gmail.com',password:'8978'};
	let body=req.body;

	let sql='SELECT * FROM jungle WHERE email=?';
	db.query(sql,body.email,async(err,result)=>{
	//console.log(result[0].password,md5(body.password));

		if(err) throw err;
		if(!result|| !((md5(body.password)==result[0].password))) res.send('Wrong Email');
		else {
			console.log('Correct Email');
		}	
	})
	jwt.sign({body}, 'secretkey',(err,token) => {
		// res.json({
		// 	token: token
		// });
		token:token;
	//string val=body.email;
	let sql1='UPDATE jungle SET created=? WHERE email=?';
	db.query(sql1,[token,body.email],(err,result)=>{
	 	if(err) throw err;
	 	console.log("Token inserted");
	});

	});
	let sql2='UPDATE jungle SET updatedtime=? WHERE email=?';
	let query2=db.query(sql2,[time,body.email],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		res.send('Login Succesful and Updated Time Added');
	});
}

function loginaccesstoken(req,res) {
	let body = req.body;

	let sql='SELECT * FROM jungle WHERE created=?'
	let query=db.query(sql,body.created,(err,result)=>{
		if(err) throw err;
		res.send({
			result
		});
	});
}


//For Posts:-
function createtablepost(req,res){
	let sql='CREATE TABLE fb_post(id int AUTO_INCREMENT,name VARCHAR(255),post VARCHAR(255),liked int,comment VARCHAR(255),PRIMARY KEY(id))';
	db.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send('table created');
	})
}

function createcommenttable (req,res){
	let sql='CREATE TABLE comment_fb_post(c_id int AUTO_INCREMENT,comment VARCHAR(255),post_id int,created_at DATETIME,PRIMARY KEY(c_id))';
	db.query(sql,(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send('comment table created');
	})
}

function createpost (req,res){
	let body=req.body;
	let sql='INSERT INTO fb_post SET ?';
	db.query(sql,body,(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send('New Post Added');
	})
}

function liked(req,res){
	let body=req.params.id;
	let sql='UPDATE fb_post SET liked=liked+1 WHERE id=?';
	db.query(sql,body,(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send("id "+body+" was liked" );
	})
}

function deleteid(req,res){
	let body=req.params.id;
	let sql='DELETE FROM fb_post WHERE id=?';
	db.query(sql,body,(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send("id = "+body+" deleted");
	})
}

function comment(req,res){
	let body=req.body;
	let post_id=req.params.id;
	let sql='INSERT INTO comment_fb_post SET ?';
	db.query(sql,[{
		"comment": body.comment,
		"post_id": post_id
	}],(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send("comment added in id "+post_id);
	})
}

function displaycomment(req,res){
	let body=req.params.id;
	let sql='SELECT comment,created_at from comment_fb_post where post_id=? ORDER BY created_at DESC';
	db.query(sql,body,(err,result)=>{
		if(err) throw err;
		console.log(result);
		res.send(result);
	})
}

exports.createdb = createdb;
exports.createapi = createapi;
exports.signup = signup;
exports.login = login;
exports.loginaccesstoken=loginaccesstoken;
//For Post:-
exports.deleteid=deleteid;
exports.createtablepost=createtablepost;
exports.createcommenttable=createcommenttable;
exports.liked=liked;
exports.comment=comment;
exports.displaycomment=displaycomment;
exports.createpost=createpost;