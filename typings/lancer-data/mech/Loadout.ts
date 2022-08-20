import { EquipmentData } from "./Equipment";
import { MechWeaponData } from "./MechWeapon";
import { MountData } from "./Mount";

export type LoadoutData = {
  id: string;
  name: string;
  systems: EquipmentData[];
  integratedSystems: EquipmentData[];
  mounts: MountData[];
  integratedMounts: { weapon: MechWeaponData }[];
  improved_armament: MountData;
  integratedWeapon: MountData;
};

export type LoadoutDataWithIndex = {
  loadouts: LoadoutData[];
  active_loadout_index: number;
};
