const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	const token = req.header("x-auth-token");

	if (!token) {
		return res.status(401).send("No auth token");
	}

	try {
		const decoded = jwt.verify(token, keys.tokenKey);
		req.user = decoded;
		next();
	} catch (e) {
		res.status(400).json("invalid token");
	}
}

module.exports = auth;
