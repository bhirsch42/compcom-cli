import { BondPower } from "./BondPower";
import { ClockData } from "./Clock";

export type PilotBondData = {
  bondId?: string;
  xp: number;
  stress: number;
  maxStress: number;
  powerSelections: number;
  isBroken: boolean;
  burdens: ClockData[];
  bondPowers: BondPower[];
  clocks: ClockData[];
  minorIdeal: string;
  bondAnswers: string[];
};
