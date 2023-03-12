import axios from 'axios';

import { attachTokenToHeaders } from './authActions';
import {
  GET_RECIEPTS_LOADING,
  GET_RECIEPTS_SUCCESS,
  GET_RECIEPTS_FAIL,
} from '../types';

export const getReciepts = () => async (dispatch, getState) => {
  dispatch({
    type: GET_RECIEPTS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get('/api/reciepts', options);

    dispatch({
      type: GET_RECIEPTS_SUCCESS,
      payload: { reciepts: response.data.reciepts },
    });
  } catch (err) {
    dispatch({
      type: GET_RECIEPTS_FAIL,
      payload: { error: err?.response?.data.reciepts || err.reciepts },
    });
  }
};
