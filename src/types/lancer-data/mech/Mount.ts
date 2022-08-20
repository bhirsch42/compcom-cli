import { MechWeaponData } from "./MechWeapon";

export type MountData = {
  mount_type: string;
  lock: boolean;
  slots: MechWeaponData[];
  extra: MechWeaponData[];
  bonus_effects: string[];
};
