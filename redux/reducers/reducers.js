import { combineReducers } from "@reduxjs/toolkit";
import { allRoomsReducer, roomDetailsReducer } from './roomReducers'
import { authReducer } from './userReducers'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer,
    auth: authReducer
})

export default reducer;