import { combineReducers } from "@reduxjs/toolkit";
import { allRoomsReducer } from './roomReducers';

const reducer = combineReducers({

    allRooms: allRoomsReducer

})

export default reducer