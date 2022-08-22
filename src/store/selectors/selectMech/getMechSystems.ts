import { EquipmentData } from "../../../types/lancer-data/mech/Equipment";
import { MechSystemData } from "../../../types/lancer-data/mech/MechSystem";
import lancerData from "../../../types/lancer-data";
import { LoadoutData } from "../../../types/lancer-data/mech/Loadout";
import { find, map, propEq } from "ramda";

const { systems } = lancerData;

export type MechSystem = MechSystemData & EquipmentData;

function getSystems(equipmentDataArray: EquipmentData[]): MechSystem[] {
  return map((equipmentData) => {
    const systemData = find(propEq("id", equipmentData.id), systems);

    if (!systemData) {
      throw new Error(`Could not find system: ${equipmentData.id}`);
    }

    return {
      ...equipmentData,
      ...systemData,
    };
  }, equipmentDataArray);
}

export function getMechSystems(loadoutData: LoadoutData): MechSystem[] {
  return getSystems(loadoutData.systems);
}

export function getMechIntegratedSystems(
  loadoutData: LoadoutData
): MechSystem[] {
  return getSystems(loadoutData.integratedSystems);
}
