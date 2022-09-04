import { MechWeaponSaveData } from "./MechWeapon";
import { WeaponSlotData } from "./WeaponSlot";

export type MountData = {
  mount_type: string;
  lock: boolean;
  slots: WeaponSlotData[];
  extra: WeaponSlotData[];
  bonus_effects: string[];
};
