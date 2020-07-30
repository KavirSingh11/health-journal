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
} from "../actions/types";

const INITIAL_STATE = {
	lifts: [],
	history: [],
	loading: false,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case GET_LIFTS:
			return {
				...state,
				lifts: action.payload,
				loading: false,
			};
		case ADD_LIFT:
			return {};
		case EDIT_LIFT:
			return {};
		case DEL_LIFT:
			return {};

		case GET_HISTORY:
			return {
				...state,
				history: action.payload,
				loading: false,
			};
		case ADD_HISTORY:
			return {};
		case EDIT_HISTORY:
			return {};
		case DEL_HISTORY:
			return {};

		case ITEM_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
