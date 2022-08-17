import reduxToolkit, { PayloadAction } from "@reduxjs/toolkit";
const { createSlice } = reduxToolkit;

export enum LogType {
  COMMAND = "command",
  ERROR = "error",
  INFO = "info",
}

export type Log = {
  type: LogType;
  message: string;
  id: number;
};

export type LogInput = Omit<Log, "id">;

let _id = 0;
function getId() {
  return _id++;
}

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
        id: getId(),
      });
    },
    logged: (state, action: PayloadAction<LogInput>) => {
      state.logs.push({ ...action.payload, id: getId() });
    },
  },
});

export const { ranCommand, logged } = consoleSlice.actions;
