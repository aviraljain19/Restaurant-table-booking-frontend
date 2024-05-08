import { createContext, useReducer } from "react";
import axios from "axios";
import {
  RESERVATION_DETAILS_FAIL,
  RESERVATION_DETAILS_SUCCESS,
  RESERVATION_CREATION_SUCCESS,
  RESERVATION_CREATION_FAIL,
} from "./reservationActionTypes";
import { API_URL_RESERVATION } from "../../../utils/apiUrl";

export const reservationContext = createContext();

const INITIAL_STATE = {
  userauth: JSON.parse(localStorage.getItem("userAuth")),
  reservation: null,
  reservations: [],
  loading: false,
  error: null,
};

const reservationReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESERVATION_DETAILS_SUCCESS:
      return {
        ...state,
        reservation: payload,
        loading: false,
        error: null,
      };
    case RESERVATION_DETAILS_FAIL:
      return {
        ...state,
        reservation: null,
        loading: false,
        error: payload,
      };
    case RESERVATION_CREATION_SUCCESS:
      return {
        ...state,
        reservation: payload,
        loading: false,
        error: null,
      };
    case RESERVATION_CREATION_FAIL:
      return {
        ...state,
        reservation: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const ReservationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reservationReducer, INITIAL_STATE);
  console.log(state);

  const getReservationDetailsAction = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userauth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get(`${API_URL_RESERVATION}/${id}`, config);
      console.log(res);
      if (res?.data?.status === "success") {
        dispatch({
          type: RESERVATION_DETAILS_SUCCESS,
          payload: res?.data?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: RESERVATION_DETAILS_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };
  const createReservationAction = async (formData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userauth?.token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${API_URL_RESERVATION}`, formData, config);
      console.log(res);
      if (res?.data?.status === "success") {
        alert("Reservation Successfull");
        dispatch({
          type: RESERVATION_CREATION_SUCCESS,
          payload: res?.data?.data,
        });
        window.location.href = "/";
      } else {
        alert("Table already booked. Please select another one");
        window.location.href = "/select-table";
      }
    } catch (error) {
      dispatch({
        type: RESERVATION_CREATION_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };
  return (
    <reservationContext.Provider
      value={{
        getReservationDetailsAction,
        reservation: state?.reservation,
        createReservationAction,
        error: state?.error,
      }}
    >
      {children}
    </reservationContext.Provider>
  );
};
