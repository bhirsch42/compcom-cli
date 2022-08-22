import { find, propEq } from "ramda";
import { StoreState } from "../../../hooks/useStore";
import lancerData from "../../../types/lancer-data";
import { applyPilotBonuses } from "../../../lib/applyBonuses";
import { PilotData } from "../../../types/lancer-data/pilot/Pilot";
import { getPilotTalents, Talent } from "./getPilotTalents";
import { getPilotBonuses } from "./getPilotBonuses";

const { rules } = lancerData;

export type Pilot = Omit<PilotData, "talents"> & {
  talents: Talent[];
  grit: number;
  maxHp: number;
  eDefense: number;
  speed: number;
  evasion: number;
  armor: number;
};

type SelectPilot = (pilotId: string) => (state: StoreState) => Pilot | null;

export const selectPilot: SelectPilot =
  (pilotId: string) => (state: StoreState) => {
    const pilotData = find(propEq("id", pilotId), state.pilots.pilots);
    if (!pilotData) return null;

    const grit = Math.ceil(pilotData.level / 2);

    const talents: Talent[] = getPilotTalents(pilotData);

    const pilotBonuses = getPilotBonuses(pilotData);

    const basePilot = {
      ...pilotData,
      talents,
      grit,
      maxHp: rules.base_pilot_hp + grit,
      eDefense: rules.base_pilot_edef,
      speed: rules.base_pilot_speed,
      evasion: rules.base_pilot_evasion,
      armor: 0,
    };

    return applyPilotBonuses(basePilot, pilotBonuses);
  };
