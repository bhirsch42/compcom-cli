import { EquipmentData } from "./Equipment";
import { MechWeaponSaveData } from "./MechWeapon";
import { MountData } from "./Mount";

export type LoadoutData = {
  id: string;
  name: string;
  systems: EquipmentData[];
  integratedSystems: EquipmentData[];
  mounts: MountData[];
  integratedMounts: { weapon: MechWeaponSaveData }[];
  improved_armament: MountData;
  integratedWeapon: MountData;
};

export type LoadoutDataWithIndex = {
  loadouts: LoadoutData[];
  active_loadout_index: number;
};
