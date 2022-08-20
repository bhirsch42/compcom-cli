import { any, find, propEq } from "ramda";
import { StoreState } from "../../hooks/useStore";
import { ImportedMech } from "../../mech";
import lancerData, { FrameRule, pilot_gear } from "lancer-data";
const { frames } = lancerData;

export type Mech = Omit<ImportedMech, "frame"> & {
  frame: FrameRule;
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

  frame.core_system.active_bonuses;
  importedPilot.core_bonuses;

  const mech = {
    ...importedMech,
    frame,
  };

  return mech;
};
