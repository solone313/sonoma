import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_RECIEPT_LOADING,
  GET_RECIEPT_SUCCESS,
  GET_RECIEPT_FAIL,
} from '../types';

export const getReciept = (id, history) => async (dispatch, getState) => {
  dispatch({
    type: GET_RECIEPT_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`/api/reciepts/${id}`, options);

    dispatch({
      type: GET_RECIEPT_SUCCESS,
      payload: { reciept: response.data.reciept },
    });
  } catch (err) {
    if (err?.response.status === 404) {
      history.push('/notfound');
    }
    dispatch({
      type: GET_RECIEPT_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
