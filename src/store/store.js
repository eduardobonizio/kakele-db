import { createStore, combineReducers } from "redux";

import globalUser from "./reducers/currentLoggedUser.reducer";
import gameConfig from "./reducers/gameConfig.reducer";
import currentSet from "./reducers/kakeleCurrentSet.reducer";
import currentKakeleFilters from "./reducers/kakeleFiltersItems.reducer";

const rootReducer = combineReducers({
  globalUser,
  gameConfig,
  currentSet,
  currentKakeleFilters,
});

const store = createStore(rootReducer);

export default store;
