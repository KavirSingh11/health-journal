import axios from "axios";
import {
	ADD_LIFT,
	GET_LIFTS,
	EDIT_LIFT,
	DEL_LIFT,
	ADD_HISTORY,
	GET_HISTORY,
	EDIT_HISTORY,
	DEL_HISTORY,
	ITEM_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getLifts = (email) => (dispatch, getState) => {
	dispatch({ type: ITEM_LOADING });
	const body = JSON.stringify({ email });

	axios
		.post(
			"http://localhost:5000/api/lifts/liftTypes/get",
			body,
			tokenConfig(getState)
		)
		.then((res) =>
			dispatch({
				type: GET_LIFTS,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
export const addLift = (token, email, name, sets, reps, weight) => (
	dispatch,
	getState
) => {
	dispatch({ type: ITEM_LOADING });
	const body = JSON.stringify({ email, name, sets, reps, weight });

	axios
		.post(
			"http://localhost:5000/api/lifts/liftTypes/add",
			body,
			tokenConfig(getState)
		)
		.then((res) => dispatch({ type: ADD_LIFT, payload: res.data }))
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const getLiftHistory = (email, name) => (dispatch, getState) => {
	dispatch({ type: ITEM_LOADING });
	const body = JSON.stringify({ email, name });
	axios
		.post(
			"http://localhost:5000/api/lifts/liftHistory/all",
			body,
			tokenConfig(getState)
		)
		.then((res) =>
			dispatch({
				type: GET_HISTORY,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const setLoading = () => {
	return {
		type: ITEM_LOADING,
	};
};
