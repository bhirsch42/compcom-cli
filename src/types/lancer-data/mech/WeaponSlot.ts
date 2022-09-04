import { MechWeaponSaveData } from "./MechWeapon";

export type WeaponSlotData = {
  size: string;
  weapon: MechWeaponSaveData | null;
};
