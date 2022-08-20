import { MechWeapon } from "./MechWeapon";

export type WeaponSlot = {
  size: string;
  weapon: MechWeapon | null;
};
