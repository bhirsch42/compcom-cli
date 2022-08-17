import reduxToolkit from "@reduxjs/toolkit";
import { counterSlice } from "./slices/counter";
import { consoleSlice } from "./slices/console";
import { pilotsSlice } from "./slices/pilots";

const { configureStore, combineReducers } = reduxToolkit;

export function createStore() {
  return configureStore({
    reducer: combineReducers({
      counter: counterSlice.reducer,
      console: consoleSlice.reducer,
      pilots: pilotsSlice.reducer,
    }),
  });
}
