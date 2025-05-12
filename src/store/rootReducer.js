import { combineReducers } from "redux";
import { bulkForecastReducer } from "./bulkForecast/index";

export const rootReducer = combineReducers({
  bulkForecast: bulkForecastReducer,
  //   user: userReducer,
});
