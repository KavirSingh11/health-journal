const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	weight: {
		type: Number,
		required: true,
	},
});
