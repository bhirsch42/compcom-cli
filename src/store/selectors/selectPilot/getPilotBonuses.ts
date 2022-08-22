import { filter, flatten, includes, isNil, map, pluck, reject } from "ramda";
import lancerData from "../../../types/lancer-data";
import { Bonus } from "../../../types/lancer-data/Bonus";
import { PilotData } from "../../../types/lancer-data/pilot/Pilot";
import { getPilotGear } from "./getPilotGear";
import { getPilotTalents, Talent } from "./getPilotTalents";

const { core_bonuses } = lancerData;

export function getPilotBonuses(pilotData: PilotData): Bonus[] {
  const gear = getPilotGear(pilotData);
  const talents: Talent[] = getPilotTalents(pilotData);

  const gearBonuses = flatten(
    reject(
      isNil,
      map((gear) => gear.bonuses, gear)
    )
  );

  const talentBonuses = reject(
    isNil,
    flatten(pluck("bonuses", flatten(pluck("activeRanks", talents))))
  );

  const reservesBonuses = reject(
    isNil,
    flatten(pluck("bonuses", pilotData.reserves))
  );

  const coreBonuses = filter(
    (coreBonus) => includes(coreBonus.id, pilotData.core_bonuses),
    core_bonuses
  );

  const coreBonusBonuses = flatten(
    reject(isNil, pluck("bonuses", coreBonuses))
  );

  return [
    ...gearBonuses,
    ...talentBonuses,
    ...reservesBonuses,
    ...coreBonusBonuses,
  ];
}
