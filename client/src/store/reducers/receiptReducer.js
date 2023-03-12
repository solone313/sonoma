import {
  GET_RECIEPT_LOADING,
  GET_RECIEPT_SUCCESS,
  GET_RECIEPT_FAIL,
} from '../types';

const initialState = {
  reciept: {},
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIEPT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_RECIEPT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reciept: payload.reciept,
      };
    case GET_RECIEPT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    default:
      return state;
  }
}
