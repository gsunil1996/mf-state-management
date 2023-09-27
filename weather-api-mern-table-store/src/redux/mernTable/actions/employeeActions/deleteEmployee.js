import axios from "axios";
import {
  DELETE_EMPLOYEE_TABLE_DATA_FAILURE,
  DELETE_EMPLOYEE_TABLE_DATA_REQUEST,
  DELETE_EMPLOYEE_TABLE_DATA_RESET,
  DELETE_EMPLOYEE_TABLE_DATA_SUCCESS,
} from "../../actionTypes/employeeActionTypes";
import { server } from "../../server";

export const deleteEmployee =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DELETE_EMPLOYEE_TABLE_DATA_REQUEST,
      });

      const { data } = await axios.delete(`${server}/deleteEmployee/${id}`);

      // console.log("Inside action response", data);

      dispatch({
        type: DELETE_EMPLOYEE_TABLE_DATA_SUCCESS,
        payload: data || {},
      });
    } catch (error) {
      dispatch({
        type: DELETE_EMPLOYEE_TABLE_DATA_FAILURE,
        payload: error && error.message,
      });
    }
  };

export const deleteEmployeeReset = () => async (dispatch) => {
  dispatch({
    type: DELETE_EMPLOYEE_TABLE_DATA_RESET,
  });
};
