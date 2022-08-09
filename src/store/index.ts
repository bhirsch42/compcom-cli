import reduxToolkit from "@reduxjs/toolkit";
import { counterSlice } from "./counter";
import { consoleSlice } from "./console";

const { configureStore, combineReducers } = reduxToolkit;

export function createStore() {
  return configureStore({
    reducer: combineReducers({
      counter: counterSlice.reducer,
      console: consoleSlice.reducer,
    }),
  });
}
