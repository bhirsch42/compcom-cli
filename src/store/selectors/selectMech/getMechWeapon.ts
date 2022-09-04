import { find, propEq } from "ramda";
import lancerData from "../../../types/lancer-data";
import {
  MechWeaponData,
  MechWeaponSaveData,
} from "../../../types/lancer-data/mech/MechWeapon";
import { getTag, Tag } from "./getTag";

const { weapons } = lancerData;

export type MechWeapon = MechWeaponSaveData &
  Omit<MechWeaponData, "tags"> & {
    tags: Tag[];
  };

export function getMechWeapon(
  mechWeaponSaveData: MechWeaponSaveData
): MechWeapon {
  const mechWeaponData = find(propEq("id", mechWeaponSaveData.id), weapons);

  if (!mechWeaponData) {
    throw new Error(`Could not find weapon: ${mechWeaponData}`);
  }

  const tags = (mechWeaponData.tags || []).map(getTag);

  return {
    ...mechWeaponSaveData,
    ...mechWeaponData,
    tags,
  };
}
