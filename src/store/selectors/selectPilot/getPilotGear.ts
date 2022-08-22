import { flatten, isNil, map, props, reject } from "ramda";
import lancerData from "../../../types/lancer-data";
import { PilotData } from "../../../types/lancer-data/pilot/Pilot";
import { PilotEquipmentData } from "../../../types/lancer-data/PilotGear";

const { pilot_gear } = lancerData;

const compact = reject(isNil);

export function getPilotGear(pilotData: PilotData): PilotEquipmentData[] {
  const allGearIds = compact(
    map(
      (gear) => (typeof gear === "string" ? null : gear?.id),
      flatten(
        props(
          ["armor", "weapons", "gear", "extendedGear", "extendedWeapons"],
          pilotData.loadout
        )
      )
    )
  );

  return pilot_gear.filter((gear) => allGearIds.includes(gear.id));
}
