import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import globalUser from './reducers/currentLoggedUser.reducer';
import gameConfig from './reducers/gameConfig.reducer';
import currentSet from './reducers/kakeleCurrentSet.reducer';
import currentKakeleFilters from './reducers/kakeleFiltersItems.reducer';

const rootReducer = combineReducers({
  globalUser,
  gameConfig,
  currentSet,
  currentKakeleFilters,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
