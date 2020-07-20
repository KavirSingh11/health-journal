const express = require("express");
const mongoose = require("mongoose");
// const passport = require("passport");

const keys = require("./config/keys");
const PORT = 5000;
const app = express();

const localAuth = require("./routes/localAuth");
const googleAuth = require("./routes/googleAuth");
const facebookAuth = require("./routes/facebookAuth");
//const testRoutes = require("./routes/app");

mongoose.connect(
	keys.MongoURI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	() => {
		console.log("Connected to database");
	}
);

app.use(express.json());

//Routes
app.use("/auth", localAuth);
//app.use("/test", testRoutes);
// app.use('/oauth/google', googleAuth);
// app.use('/oauth/facebook', facebookAuth);
// app.use(passport.initialize());
// app.use(passport.session());

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
