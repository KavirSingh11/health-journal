import axios from "axios";
import {
	ADD_LIFT,
	GET_LIFTS,
	EDIT_LIFT,
	DEL_LIFT,
	ADD_HISTORY,
	GET_ALL_HISTORY,
	GET_DATE_HISTORY,
	EDIT_HISTORY,
	DEL_HISTORY,
	ITEM_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";
import { tokenConfig } from "./authActions";

export const getLifts = (email) => async (dispatch, getState) => {
	dispatch({ type: ITEM_LOADING });
	const body = JSON.stringify({ email });

	const response = await axios
		.post(
			"http://localhost:5000/api/lifts/liftTypes/get",
			body,
			tokenConfig(getState)
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
	dispatch({
		type: GET_LIFTS,
		payload: response.data,
	});
};
export const addLift = (email, name, sets, reps, weight) => async (
	dispatch,
	getState
) => {
	dispatch({ type: ITEM_LOADING });
	const body = JSON.stringify({ email, name, sets, reps, weight });
	const response = await axios
		.post(
			"http://localhost:5000/api/lifts/liftTypes/add",
			body,
			tokenConfig(getState)
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
	dispatch({ type: ADD_LIFT, payload: response.data });
};

export const editLift = (email, name, newInfo) => (dispatch, getState) => {
	dispatch({ type: ITEM_LOADING });
	const body = JSON.stringify({ email, name, newInfo });

	axios
		.patch(
			"http://localhost:5000/api/lifts/liftTypes",
			body,
			tokenConfig(getState)
		)
		.then((res) => dispatch({ type: EDIT_LIFT, payload: res.data }))
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deleteLift = (email, name) => (dispatch, getState) => {
	dispatch({ type: ITEM_LOADING });
	const body = JSON.stringify({ email, name });
	axios
		.post(
			"http://localhost:5000/api/lifts/liftTypes/del",
			body,
			tokenConfig(getState)
		)
		.then((res) => dispatch({ type: DEL_LIFT, payload: res.data }))
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};
/*------------------------------------------------------------------------

------------------------------------------------------------------------- */
export const getAllHistory = (email, name) => (dispatch, getState) => {
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
				type: GET_ALL_HISTORY,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const getDateHistory = () => (dispatch, getState) => {
	dispatch({ type: ITEM_LOADING });
};

export const addToHistory = (email, name, date, weight) => async (
	dispatch,
	getState
) => {
	dispatch({ type: ITEM_LOADING });
	const body = JSON.stringify({ email, name, date, weight });

	const response = await axios
		.post(
			"http://localhost:5000/api/lifts/liftHistory",
			body,
			tokenConfig(getState)
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
	dispatch({
		type: ADD_HISTORY,
		payload: response.data,
	});
};
export const editHistory = () => (dispatch, getState) => {
	dispatch({ type: ITEM_LOADING });
};
export const deleteHistory = () => (dispatch, getState) => {
	dispatch({ type: ITEM_LOADING });
};
export const setLoading = () => {
	return {
		type: ITEM_LOADING,
	};
};
