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
			return {
				...state,
				lifts: [...state.lifts, action.payload],
				loading: false,
			};
		case EDIT_LIFT:
			return {
				...state,
				lifts: state.lifts.map((item) =>
					item.name === action.payload.name ? action.payload.newInfo : item
				),
				loading: false,
			};
		case DEL_LIFT:
			return {
				...state,
				lifts: state.lifts.filter((item) => item.name !== action.payload),
				loading: false,
			};

		case GET_ALL_HISTORY:
			return {
				...state,
				history: action.payload,
				loading: false,
			};

		case GET_DATE_HISTORY:
			return {
				...state,
				detailHistory: action.payload,
				loading: false,
			};
		case ADD_HISTORY:
			return {
				...state,
				history: [...state.history, action.payload],
				loading: false,
			};
		case EDIT_HISTORY:
			return {
				...state,
				history: state.history.map((item) =>
					item.date === action.payload.date ? action.payload.newInfo : item
				),
				loading: false,
			};
		case DEL_HISTORY:
			return {
				...state,
				history: state.history.filter((item) => item.date !== action.payload),
				loading: false,
			};

		case ITEM_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
