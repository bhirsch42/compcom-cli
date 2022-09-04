import { EquipmentData } from "../../../types/lancer-data/mech/Equipment";
import { MechSystemData } from "../../../types/lancer-data/mech/MechSystem";
import lancerData from "../../../types/lancer-data";
import { find, propEq } from "ramda";
import { getTag, Tag } from "./getTag";

const { systems } = lancerData;

export type MechSystem = Omit<MechSystemData, "tags"> &
  EquipmentData & {
    tags: Tag[];
  };

export function getMechSystem(equipmentData: EquipmentData): MechSystem {
  const systemData = find(propEq("id", equipmentData.id), systems);

  if (!systemData) {
    throw new Error(`Could not find system: ${equipmentData.id}`);
  }

  const tags = systemData.tags?.map(getTag) || [];

  return {
    ...equipmentData,
    ...systemData,
    tags,
  };
}
