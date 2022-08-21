import { MechWeaponData } from "./MechWeapon";

export type WeaponSlot = {
  size: string;
  weapon: MechWeaponData | null;
};
