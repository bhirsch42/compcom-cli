import { find, flatten, isNil, map, propEq, props, reject } from "ramda";
import { StoreState } from "../../hooks/useStore";
import lancerData from "../../types/lancer-data";
const { rules, pilot_gear } = lancerData;
import { applyPilotBonuses, Pilot } from "../../lib/applyBonuses";

const compact = reject(isNil);

type SelectPilot = (pilotId: string) => (state: StoreState) => Pilot | null;

export const selectPilot: SelectPilot =
  (pilotId: string) => (state: StoreState) => {
    const importedPilot = find(propEq("id", pilotId), state.pilots.pilots);
    if (!importedPilot) return null;

    const grit = Math.ceil(importedPilot.level / 2);

    const allGearIds = compact(
      map(
        (gear) => (typeof gear === "string" ? null : gear?.id),
        flatten(
          props(
            ["armor", "weapons", "gear", "extendedGear", "extendedWeapons"],
            importedPilot.loadout
          )
        )
      )
    );

    const allGear = pilot_gear.filter((gear) => allGearIds.includes(gear.id));

    const allBonuses = flatten(compact(map((gear) => gear.bonuses, allGear)));

    const basePilot = {
      ...importedPilot,
      grit,
      maxHp: rules.base_pilot_hp + grit,
      eDefense: rules.base_pilot_edef,
      speed: rules.base_pilot_speed,
      evasion: rules.base_pilot_evasion,
      armor: 0,
    };

    return applyPilotBonuses(basePilot, allBonuses);
  };
