import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
    createStateSyncMiddleware,
    initMessageListener,
  } from "redux-state-sync";

import gameReducer from './features/gameSlice'
import numberReducer from './features/numberSlice'
const middlewares = [createStateSyncMiddleware()];

const rootReducer = combineReducers({
      game:gameReducer,
      luckyNumbers: numberReducer,
      isPopupOpen: (state = false, action) => {
        switch (action.type) {
          case 'TOGGLE_ACTIVE':
            return !state;
          default:
            return state;
        }
      },
})

const store = configureStore({reducer:rootReducer, middleware:[createStateSyncMiddleware()]})
initMessageListener(store);
export default  store