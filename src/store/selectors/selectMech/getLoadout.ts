import { map } from "ramda";
import { LoadoutData } from "../../../types/lancer-data/mech/Loadout";
import { getMechSystem, MechSystem } from "./getMechSystem";
import { getMount, Mount } from "./getMount";

export type Loadout = Omit<
  LoadoutData,
  "systems" | "integratedSystems" | "mounts" | "integratedWeapon"
> & {
  systems: MechSystem[];
  integratedSystems: MechSystem[];
  mounts: Mount[];
  integratedWeapon: Mount;
};

export function getLoadout(loadoutData: LoadoutData): Loadout {
  return {
    ...loadoutData,
    systems: map(getMechSystem, loadoutData.systems),
    integratedSystems: map(getMechSystem, loadoutData.integratedSystems),
    mounts: map(getMount, loadoutData.mounts),
    integratedWeapon: getMount(loadoutData.integratedWeapon),
  };
}
