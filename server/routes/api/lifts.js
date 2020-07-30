const express = require("express");
const router = express.Router();
const _ = require("lodash");
const keys = require("../../config/keys");
const auth = require("../../middleware/auth");

const { Lift } = require("../../models/Lifts");
const { LiftHistory } = require("../../models/LiftHistory");

router.post("/liftTypes/get", auth, async (req, res) => {
	const email = req.body.email;
	Lift.find({ email: email })
		.select("-email -_id")
		.then((lifts) => res.json(lifts))
		.catch((err) => res.json(`Error ${err.message}`));
});
router.post("/liftTypes/add", auth, async (req, res) => {
	const email = req.body.email;
	const name = req.body.name;
	const sets = req.body.sets;
	const reps = req.body.reps;
	const weight = req.body.weight;

	const newLift = new Lift({
		email,
		name,
		sets,
		reps,
		weight,
	});
	newLift
		.save()
		.then(() => res.json(`${name} added`))
		.catch((err) => res.json(`Error: ${err.message}`));
});
router.patch("/liftTypes", auth, async (req, res) => {
	const email = req.body.email;
	const name = req.body.name;
	const newInfo = req.body.newInfo;
	Lift.findOneAndUpdate({ email, name }, newInfo, { useFindAndModify: false })
		.then(() => res.status(200).json(`Successfully updated`))
		.catch((e) => res.status(400).json(`Error: ${err.message}`));
});
router.delete("/liftTypes", auth, async (req, res) => {
	const email = req.body.email;
	const name = req.body.name;

	Lift.find({ email: email, name: name })
		.deleteOne(() => res.status(200).json(`${name} successfully removed`))
		.catch((err) => res.status(400).json(`Error: ${err.message}`));
});
/*------------------------------------------------------------------------------

-------------------------------------------------------------------------------*/
router.post("/liftHistory/date", auth, async (req, res) => {
	const email = req.body.email;
	const date = req.body.date;
	LiftHistory.find({ email, date })
		.select("-email")
		.then((history) => res.json(history))
		.catch((err) => res.json(`Error: ${err.message}`));
});
router.post("/liftHistory/all", auth, async (req, res) => {
	const email = req.body.email;
	const name = req.body.name;
	LiftHistory.find({ email, name })
		.select("-email")
		.sort({ date: 1 })
		.then((history) => res.json(history))
		.catch((err) => res.json(`Error: ${err.message}`));
});
router.post("/liftHistory", auth, async (req, res) => {
	const email = req.body.email;
	const name = req.body.name;
	const date = req.body.date;
	const weight = req.body.weight;

	const newLift = new LiftHistory({
		email,
		name,
		date,
		weight,
	});
	newLift
		.save()
		.then(() => res.json(`${name} on ${date} added`))
		.catch((err) => res.json(`Error: ${err.message}`));
});
router.patch("/liftHistory", auth, async (req, res) => {
	const email = req.body.email;
	const date = req.body.date;
	const newInfo = req.body.newInfo;
	LiftHistory.findOneAndUpdate({ email, date }, newInfo, {
		useFindAndModify: false,
	})
		.then(() => res.status(200).json(`Successfully updated`))
		.catch((e) => res.status(400).json(`Error: ${err.message}`));
});
router.delete("/liftHistory", auth, async (req, res) => {
	const email = req.body.email;
	const date = req.body.date;
	LiftHistory.find({ email: email, date: date })
		.deleteOne(() =>
			res.status(200).json(`Lift on ${date} successfully removed`)
		)
		.catch((err) => res.status(400).json(`Error: ${err.message}`));
});
module.exports = router;
