import { any, find, flatten, isNil, map, pluck, propEq, reject } from "ramda";
import { StoreState } from "../../../hooks/useStore";
import lancerData from "../../../types/lancer-data";
import { Bonus } from "../../../types/lancer-data/Bonus";
import { EntityStats } from "../../../types/lancer-data/EntityStats";
import { EquipmentData } from "../../../types/lancer-data/mech/Equipment";
import { FrameRule } from "../../../types/lancer-data/mech/frame/Frame";
import { LoadoutData } from "../../../types/lancer-data/mech/Loadout";
import { MechData } from "../../../types/lancer-data/mech/Mech";
import { MechSystemData } from "../../../types/lancer-data/mech/MechSystem";
import { getPilotBonuses } from "../selectPilot/getPilotBonuses";
import { getLoadout, Loadout } from "./getLoadout";
import { getMechSystems, MechSystem } from "./getMechSystems";
const { frames } = lancerData;

export type Mech = Omit<MechData, "frame" | "loadouts"> & {
  frame: FrameRule;
  stats: EntityStats;
  loadouts: Loadout[];
  activeLoadout: Loadout;
};

type SelectMech = (mechId: string) => (state: StoreState) => Mech | null;

function pluckBonuses(records: { bonuses?: Bonus[] }[]): Bonus[] {
  return flatten(reject(isNil, pluck("bonuses", records)));
}

export const selectMech: SelectMech = (mechId) => (state) => {
  const pilotData = find(
    (pilot) => any(propEq("id", mechId), pilot.mechs),
    state.pilots.pilots
  );

  if (!pilotData) return null;

  const importedMech = find(propEq("id", mechId), pilotData.mechs);

  if (!importedMech) return null;

  const frame = find(propEq("id", importedMech.frame), frames);

  if (!frame) return null;

  const loadouts = map(getLoadout, importedMech.loadouts);
  const activeLoadout = loadouts[importedMech.active_loadout_index];

  const pilotBonuses = getPilotBonuses(pilotData);

  const bonuses: Bonus[] = flatten(
    reject(isNil, [
      frame.bonuses,
      importedMech.core_active ? frame.core_system.active_bonuses : null,
      frame.core_system.passive_bonuses,
      pilotBonuses,
      pluckBonuses(activeLoadout.systems),
      pluckBonuses(activeLoadout.integratedSystems),
    ])
  );

  // console.log(activeLoadout);

  const mech = {
    ...importedMech,
    frame,
    stats: frame.stats,
    loadouts,
    activeLoadout,
  };

  return mech;
};
