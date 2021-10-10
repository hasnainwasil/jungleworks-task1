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

	}else{
		console.log("VALID DATA");
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
	}else{
		console.log("VALID DATA");
	}
	next();
	})();
	
}

exports.uploadImage = function (req, res,next) {
	let body=req.body;
	const userSchema = joi.object({
		image_link: joi.string().email().required(),
		user_id: joi.number().required(),
	});

	(async() => {
	const JOI = await userSchema.validateAsync(body);
	if(JOI.error){
		console.log(JOI.error.details);
	}else{
		console.log("VALID DATA");
	}
	next();
	})();
	
}

exports.fetchImage = function (req, res,next) {
	let body=req.body;
	const userSchema = joi.object({
		im_id: joi.number().required(),
		user_id: joi.number().required(),
	});

	(async() => {
	const JOI = await userSchema.validateAsync(body);
	if(JOI.error){
		console.log(JOI.error.details);
	}else{
		console.log("VALID DATA");
	}
	next();
	})();
	
}