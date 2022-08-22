import { LoadoutData } from "../../../types/lancer-data/mech/Loadout";
import {
  getMechIntegratedSystems,
  getMechSystems,
  MechSystem,
} from "./getMechSystems";

export type Loadout = Omit<LoadoutData, "systems" | "integratedSystems"> & {
  systems: MechSystem[];
  integratedSystems: MechSystem[];
};

export function getLoadout(loadoutData: LoadoutData): Loadout {
  return {
    ...loadoutData,
    systems: getMechSystems(loadoutData),
    integratedSystems: getMechIntegratedSystems(loadoutData),
  };
}
