import { combineReducers } from "@reduxjs/toolkit";
import { allRoomsReducer, roomDetailsReducer } from './roomReducers'
import { authReducer, userReducer, loadedUserReducer, forgotPasswordReducer } from './userReducers'
import { checkBookingReducer, bookedDatesReducer } from "./bookingReducers";

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer,
    user: userReducer,
    loadedUser: loadedUserReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer
})

export default reducer;