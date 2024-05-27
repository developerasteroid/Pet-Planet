// actions.js
import axiosInstance from '../helper/axiosInstance';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './cartReducer';

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axiosInstance.get('api/user/cart');
      const data = response.data;
      dispatch(fetchDataSuccess(data));
    } catch (error) {
      dispatch(fetchDataFailure(error));
    }
  };
};
