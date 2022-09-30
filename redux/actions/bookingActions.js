import axios from "axios";

import {
    CHECK_BOOKING_REQUEST,
    CHECK_BOOKING_SUCCESS,
    CHECK_BOOKING_RESET,
    CHECK_BOOKING_FAIL,
    BOOKED_DATES_SUCCESS,
    BOOKED_DATES_FAIL,
    CLEAR_ERRORS
} from '../constants/bookingConstants'


export const checkBooking = (roomId, checkInDate, checkOutDate) => async (dispatch) => {
    try {

    dispatch({ type: CHECK_BOOKING_REQUEST })

    let link = `/api/bookings/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`


    const { data } = await axios.get(link)


       dispatch({
          type: CHECK_BOOKING_SUCCESS,
          payload: data.isAvailable
       })
        
    } catch (error) {
        dispatch({
            type: CHECK_BOOKING_FAIL,
            payload: error.response.data.message
        })
        
    }
}


export const getBookedDates = (id) => async (dispatch) => {
    try {


    const { data } = await axios.get(`/api/bookings/checkBookedDates?roomId=${id}`)


       dispatch({
          type: BOOKED_DATES_SUCCESS,
          payload: data.bookedDates
       })
        
    } catch (error) {
        dispatch({
            type: BOOKED_DATES_FAIL,
            payload: error.response.data.message
        })
        
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}