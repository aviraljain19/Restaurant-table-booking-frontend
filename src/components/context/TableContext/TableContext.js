import { createContext, useReducer } from "react";
import axios from "axios";
import {
  TABLE_DETAILS_FAIL,
  TABLE_DETAILS_SUCCESS,
  TABLE_CREATION_SUCCESS,
  TABLE_CREATION_FAIL,
} from "./tableActionTypes";
import { API_URL_TABLE } from "../../../utils/apiUrl";

export const tableContext = createContext();

const INITIAL_STATE = {
  userauth: JSON.parse(localStorage.getItem("userAuth")),
  table: null,
  tables: [],
  loading: false,
  error: null,
};

const tableReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TABLE_DETAILS_SUCCESS:
      return {
        ...state,
        table: payload,
        loading: false,
        error: null,
      };
    case TABLE_DETAILS_FAIL:
      return {
        ...state,
        table: null,
        loading: false,
        error: payload,
      };
    case TABLE_CREATION_SUCCESS:
      return {
        ...state,
        table: payload,
        loading: false,
        error: null,
      };
    case TABLE_CREATION_FAIL:
      return {
        ...state,
        table: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const TableContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tableReducer, INITIAL_STATE);
  console.log(state);

  const getTableDetailsAction = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userauth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(`${API_URL_TABLE}/`, config);
      console.log(res);
      if (res?.data?.status === "success") {
        dispatch({
          type: TABLE_DETAILS_SUCCESS,
          payload: res?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TABLE_DETAILS_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };
  const createTableAction = async (formData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userauth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${API_URL_TABLE}`, formData, config);
      console.log(res);
      if (res?.data?.status === "success") {
        dispatch({
          type: TABLE_CREATION_SUCCESS,
          payload: res?.data?.data,
        });
      }
      window.location.href = "/";
    } catch (error) {
      dispatch({
        type: TABLE_CREATION_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };
  return (
    <tableContext.Provider
      value={{
        getTableDetailsAction,
        table: state?.table,
        createTableAction,
        error: state?.error,
      }}
    >
      {children}
    </tableContext.Provider>
  );
};
