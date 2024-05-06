import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import alertSliceReducer from '../features/alertSlice';
import postersDataReducer from '../features/postersDataSlice';
import userStatusReducer from '../features/userStatusSlice';
import cartItemsReducer from '../features/cartSlice';
import ordersSliceReducer from '../features/ordersSlice';


const rootReducer = combineReducers({
  userDetail: alertSliceReducer,
  postersData: postersDataReducer,
  userStatus:userStatusReducer,
  cartItems:cartItemsReducer,
  orders:ordersSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer
});
