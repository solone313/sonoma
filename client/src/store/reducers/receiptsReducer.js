import {
  GET_RECIEPTS_LOADING,
  GET_RECIEPTS_SUCCESS,
  GET_RECIEPTS_FAIL,
} from '../types';

const initialState = {
  reciepts: [],
  isLoading: false,
  error: null,
};

// You could have an array [{ id: 1, isLoading: false, error: null, text: "Hey" }, { id: 2, isLoading: true, error: null, text: null }]

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIEPTS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_RECIEPTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reciepts: payload.reciepts,
      };
    case GET_RECIEPTS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    default:
      return state;
  }
}
