const mongoose = require("mongoose");
const joi = require("joi");
const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

function validateSignUp(user) {
	const schema = {
		email: joi.string().required().email(),
		name: joi.string().required(),
		password: joi.string().required(),
	};
	return joi.validate(user, schema);
}
function validateLogIn(user) {
	const schema = {
		email: joi.string().required().email(),
		password: joi.string().required(),
	};
	return joi.validate(user, schema);
}

const User = mongoose.model("user", UserSchema);

exports.User = User;
exports.validateSignUp = validateSignUp;
exports.validateLogIn = validateLogIn;
