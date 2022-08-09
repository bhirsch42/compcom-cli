import reduxToolkit, { PayloadAction } from "@reduxjs/toolkit";
import { Text } from "ink";
import React from "react";
const { createSlice } = reduxToolkit;

export enum LogType {
  COMMAND = "command",
}

export type Log = {
  type: LogType;
  message: string;
};

export const consoleSlice = createSlice({
  name: "console",
  initialState: {
    logs: [] as Log[],
    commandHistory: [] as string[],
  },
  reducers: {
    ranCommand: (state, action: PayloadAction<string>) => {
      state.commandHistory.push(action.payload);

      state.logs.push({
        type: LogType.COMMAND,
        message: action.payload,
      });
    },
  },
});

export const { ranCommand } = consoleSlice.actions;
