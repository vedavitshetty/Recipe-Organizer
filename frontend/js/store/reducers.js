import { combineReducers } from "@reduxjs/toolkit";

import { restCheckReducer as restCheck } from "./rest_check";
import { restaurantSlice } from "./restaurantSlice";
import { userSlice } from "./userSlice";

export const rootReducer = combineReducers({
  restCheck,
  restaurantSlice,
  userSlice,
});
