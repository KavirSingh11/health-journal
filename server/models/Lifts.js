const mongoose = require("mongoose");
const joi = require("joi");
const LiftSchema = new mongoose.Schema({
	email: { type: String, required: true },
	name: { type: String, required: true },
	sets: { type: Number, required: true },
	reps: { type: Number, required: true },
	weight: { type: Number, required: true },
});

const Lift = mongoose.model("lifts", LiftSchema);
exports.Lift = Lift;
