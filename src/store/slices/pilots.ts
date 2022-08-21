import reduxToolkit, { PayloadAction } from "@reduxjs/toolkit";
import { CompconData } from "../../importCompconFile";
import { PilotData } from "../../types/lancer-data/pilot/Pilot";
const { createSlice } = reduxToolkit;

type PilotsSlice = {
  pilots: PilotData[];
};

const INITIAL_STATE: PilotsSlice = {
  pilots: [],
};

export const pilotsSlice = createSlice({
  name: "pilots",
  initialState: INITIAL_STATE,
  reducers: {
    loadedPilots: (state, action: PayloadAction<CompconData>) => {
      state.pilots = action.payload.pilots;
    },
  },
});

export const { loadedPilots } = pilotsSlice.actions;
