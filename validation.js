const joi=require('@hapi/joi');

exports.login = function (req, res,next) {
	const authSchema = joi.object({
		email: joi.string().email().lowercase().required(),
		password: joi.string().min(2).required(),
	});

	let body=req.body;
	(async() => {
	const JOI = await authSchema.validateAsync(body);
	if(JOI.error){
		console.log(JOI.error.details);
		//res.send("ERROR IN VALIDATION");
	}else{
		console.log("VALID DATA");
		//res.send("VALID DATA");
	}
	next();
	})();


}

exports.signup = function (req, res,next) {

	const userSchema = joi.object({
		firstname: joi.string().min(5).required(),
		lastname: joi.string().min(5).required(),
		email: joi.string().email().lowercase().required(),
		password: joi.string().min(2).required(),
	});

    let body=req.body;
	(async() => {
	const JOI = await userSchema.validateAsync(body);
	if(JOI.error){
		console.log(JOI.error.details);
		//res.send("ERROR IN VALIDATION");
	}else{
		console.log("VALID DATA");
		//res.send("VALID DATA");
	}
	next();
	})();
	
}