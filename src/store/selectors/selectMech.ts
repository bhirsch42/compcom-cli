import { any, find, flatten, isNil, propEq, reject } from "ramda";
import { StoreState } from "../../hooks/useStore";
import { ImportedMech } from "../../mech";
import lancerData from "../../types/lancer-data";
import { Bonus } from "../../types/lancer-data/Bonus";
import { EntityStats } from "../../types/lancer-data/EntityStats";
import { FrameRule } from "../../types/lancer-data/mech/frame/Frame";
import { MechData } from "../../types/lancer-data/mech/Mech";
const { frames } = lancerData;

export type Mech = Omit<MechData, "frame"> & {
  frame: FrameRule;
  stats: EntityStats;
};

type SelectMech = (mechId: string) => (state: StoreState) => Mech | null;

export const selectMech: SelectMech = (mechId) => (state) => {
  const importedPilot = find(
    (pilot) => any(propEq("id", mechId), pilot.mechs),
    state.pilots.pilots
  );

  if (!importedPilot) return null;

  const importedMech = find(propEq("id", mechId), importedPilot.mechs);

  if (!importedMech) return null;

  const frame = find(propEq("id", importedMech.frame), frames);

  if (!frame) return null;

  const activeLoadout =
    importedMech.loadouts[importedMech.active_loadout_index];

  const bonuses: Bonus[] = flatten(
    reject(isNil, [
      frame.bonuses,
      frame.core_system.active_bonuses,
      frame.core_system.passive_bonuses,
    ])
  );

  console.log(activeLoadout);

  const mech = {
    ...importedMech,
    frame,
    stats: frame.stats,
  };

  return mech;
};
