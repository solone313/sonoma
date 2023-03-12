import { combineReducers } from 'redux';

import authReducer from './authReducer';
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import messageReducer from './messageReducer';
import receiptReducer from './receiptReducer';
import receiptsReducer from './receiptsReducer';

export default combineReducers({
  auth: authReducer,
  register: registerReducer,
  message: messageReducer,
  user: userReducer,
  reciept: receiptReducer,
  reciepts: receiptsReducer,
  users: usersReducer,
});
