import { flatten, isNil, pluck, reject } from "ramda";
import { Mech } from ".";
import { Bonus } from "../../../types/lancer-data/Bonus";

function pluckBonuses(records: { bonuses?: Bonus[] }[]): Bonus[] {
  return flatten(reject(isNil, pluck("bonuses", records)));
}

export function getMechBonuses(mech: Mech): Bonus[] {
  return flatten(
    reject(isNil, [
      mech.frame.bonuses,
      mech.core_active ? mech.frame.core_system.active_bonuses : null,
      mech.frame.core_system.passive_bonuses,
      pluckBonuses(mech.activeLoadout.systems),
      pluckBonuses(mech.activeLoadout.integratedSystems),
    ])
  );
}
