import { map } from "ramda";
import { MountData } from "../../../types/lancer-data/mech/Mount";
import { WeaponSlotData } from "../../../types/lancer-data/mech/WeaponSlot";
import { getMechWeapon, MechWeapon } from "./getMechWeapon";

export type WeaponSlot = Omit<WeaponSlotData, "weapon"> & {
  weapon: MechWeapon | null;
};

export type Mount = Omit<MountData, "slots" | "extra"> & {
  slots: WeaponSlot[];
  extra: WeaponSlot[];
};

const mapWeapons = map<WeaponSlotData, WeaponSlot>((slot) => ({
  ...slot,
  weapon: slot.weapon && getMechWeapon(slot.weapon),
}));

export function getMount(mountData: MountData): Mount {
  return {
    ...mountData,
    slots: mapWeapons(mountData.slots),
    extra: mapWeapons(mountData.extra),
  };
}
