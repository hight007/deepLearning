import registerReducer from "./register.reducer";
import loginReducer from "./login.reducer";
import appReducer from "./app.reducer";
import divcodeReducer from "./division_code.reducer";
import plantCodeReducer from "./plant_code.reducer";
import manageUserReducer from "./manage_user.reducer";

import { combineReducers } from "redux";

export default combineReducers({
  registerReducer,
  loginReducer,
  appReducer,
  divcodeReducer,
  plantCodeReducer,
  manageUserReducer,
});
