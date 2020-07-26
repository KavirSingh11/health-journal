const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const keys = require("../config/keys");
const auth = require("../middleware/auth");

const { User, validateSignUp, validateLogIn } = require("../models/User");

router.post("/signin", async (req, res) => {
	const { error } = validateLogIn(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}
	let user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).send("Incorrect login");
	}

	const correctPass = await bcrypt.compare(req.body.password, user.password);
	if (!correctPass) {
		res.status(400).send("Incorrect login");
	}
	const token = jwt.sign({ _id: user._id }, keys.tokenKey);
	res.header("x-auth-token", token).json({ token });
});

router.post("/signup", async (req, res) => {
	const { error } = validateSignUp(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	let user = await User.findOne({ email: req.body.email });
	if (user) {
		return res.status(400).send("That user exists");
	} else {
		user = new User(_.pick(req.body, ["name", "email", "password", "date"]));
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		await user.save();
		const token = jwt.sign({ _id: user._id }, keys.tokenKey, {
			expiresIn: 3600 * 5,
		});
		res
			.header("x-auth-token", token)
			.send(_.pick(user, ["_id", "name", "email", "date"]));
	}
});

router.get("/user", auth, (req, res) => {
	User.findById(req.user._id)
		.select("-password")
		.then((user) => res.json(user));
});

router.get("/private", auth, (req, res) => {
	res.send("private route accessed with token header");
});

module.exports = router;
