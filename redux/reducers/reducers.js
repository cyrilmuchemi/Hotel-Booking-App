import { combineReducers } from "@reduxjs/toolkit";
import { allRoomsReducer, roomDetailsReducer } from './roomReducers'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    roomDetails: roomDetailsReducer
})

export default reducer;