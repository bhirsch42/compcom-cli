import { any, find, propEq } from "ramda";
import { StoreState } from "../../hooks/useStore";
import { ImportedMech } from "../../mech";

export type Mech = ImportedMech & {};

type SelectMech = (mechId: string) => (state: StoreState) => Mech | null;

export const selectMech: SelectMech = (mechId) => (state) => {
  const importedPilot = find(
    (pilot) => any(propEq("id", mechId), pilot.mechs),
    state.pilots.pilots
  );

  if (!importedPilot) return null;

  const importedMech = find(propEq("id", mechId), importedPilot.mechs);

  if (!importedMech) return null;

  return importedMech;
};
