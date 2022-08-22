import { flatten, isNil, map, pluck, reject } from "ramda";
import { Bonus } from "../../../types/lancer-data/Bonus";
import { PilotData } from "../../../types/lancer-data/pilot/Pilot";
import { getPilotGear } from "./getPilotGear";
import { getPilotTalents, Talent } from "./getPilotTalents";

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

  return [...gearBonuses, ...talentBonuses];
}
