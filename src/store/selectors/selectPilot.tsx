import lancerData from "lancer-data";
import { find, propEq } from "ramda";
import { StoreState } from "../../hooks/useStore";
import { ImportedPilot } from "../../types/Pilot";
const { rules } = lancerData;

export type Pilot = ImportedPilot & {
  grit: number;
  maxHp: number;
  eDefense: number;
  speed: number;
};

export const selectPilot = (pilotId: string) => (state: StoreState) => {
  const importedPilot = find(propEq("id", pilotId), state.pilots.pilots);
  if (!importedPilot) return null;

  const grit = Math.ceil(importedPilot.level / 2);

  return {
    ...importedPilot,
    grit,
    maxHp: rules.base_pilot_hp + grit,
    eDefense: rules.base_pilot_edef,
    speed: rules.base_pilot_speed,
  };
};
