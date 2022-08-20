import { groupBy, map, prop, sum } from "ramda";
import { Bonus } from "../types/lancer-data/Bonus";
import { ImportedPilot } from "../types/Pilot";
import evaluateModifier from "./evaluateModifier";

type DerivedPilotStat = "armor" | "eDefense" | "evasion" | "maxHp" | "speed";
type EvaluatedBonus = Omit<Bonus, "val"> & { val: number };

export type Pilot = ImportedPilot & {
  grit: number;
  armor: number;
  eDefense: number;
  evasion: number;
  maxHp: number;
  speed: number;
};

type GroupedBonuses = Record<EvaluatedBonus["id"], EvaluatedBonus[]>;
type AggregatedBonuses = Record<EvaluatedBonus["id"], number>;

type ComputeStat = (
  pilotStat: DerivedPilotStat,
  bonusId: EvaluatedBonus["id"]
) => number;

const groupBonuses: (bonuses: EvaluatedBonus[]) => GroupedBonuses = groupBy<
  EvaluatedBonus,
  EvaluatedBonus["id"]
>(prop("id"));

function aggregateGroupedBonuses(
  aggFn: (bonusValues: number[]) => number,
  groupedBonuses: GroupedBonuses
): AggregatedBonuses {
  return map<GroupedBonuses, AggregatedBonuses>(
    (groupedBonuses: EvaluatedBonus[]) =>
      aggFn(map(prop("val"), groupedBonuses)),
    groupedBonuses
  );
}

function evaluateBonus(bonus: Bonus, pilot: Pilot): EvaluatedBonus {
  return {
    ...bonus,
    val: evaluateModifier(bonus.val, {
      grit: pilot.grit,
      ll: pilot.level,
    }),
  };
}

export function applyPilotBonuses(pilot: Pilot, bonuses: Bonus[]): Pilot {
  const evaluatedBonuses = bonuses.map((bonus) => evaluateBonus(bonus, pilot));
  const replaceBonuses = evaluatedBonuses.filter((bonus) => bonus.replace);
  const regularBonuses = evaluatedBonuses.filter((bonus) => !bonus.replace);

  const groupedReplaceBonuses = groupBonuses(replaceBonuses);
  const groupedRegularBonuses = groupBonuses(regularBonuses);

  const replaceBonusAggregations = aggregateGroupedBonuses(
    (bonusValues) => Math.max(...bonusValues),
    groupedReplaceBonuses
  );

  const regularBonusAggregations = aggregateGroupedBonuses(
    sum,
    groupedRegularBonuses
  );

  const computeStat: ComputeStat = (pilotStat, bonusId) => {
    return replaceBonusAggregations[bonusId]
      ? replaceBonusAggregations[bonusId]
      : pilot[pilotStat] + regularBonusAggregations[bonusId];
  };

  return {
    ...pilot,
    armor: computeStat("armor", "pilot_armor"),
    eDefense: computeStat("eDefense", "pilot_edef"),
    evasion: computeStat("evasion", "pilot_evasion"),
    maxHp: computeStat("maxHp", "pilot_hp"),
    speed: computeStat("speed", "pilot_speed"),
  };
}
