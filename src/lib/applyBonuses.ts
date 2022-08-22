import { groupBy, map, prop, sum } from "ramda";
import { Pilot } from "../store/selectors/selectPilot";
import { Bonus, BonusId } from "../types/lancer-data/Bonus";
import evaluateModifier from "./evaluateModifier";

type EvaluatedBonus = Omit<Bonus, "val"> & { val: number };

type GroupedBonuses = Record<EvaluatedBonus["id"], EvaluatedBonus[]>;
type AggregatedBonuses = Record<EvaluatedBonus["id"], number>;

type ComputeStat<T> = (
  stat: keyof T,
  bonusId: EvaluatedBonus["id"]
) => { [key in string]: number };

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

function applyBonuses<T>(
  pilot: Pilot,
  bonuses: Bonus[],
  entity: T,
  apply: (entity: T, getStat: ComputeStat<T>) => T
): T {
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

  const computeStat: ComputeStat<T> = (stat: keyof T, bonusId: BonusId) => {
    const entityStat = entity[stat];

    if (typeof entityStat !== "number")
      throw new Error(`Could not compute stat: ${String(stat)}`);

    const val = replaceBonusAggregations[bonusId]
      ? replaceBonusAggregations[bonusId]
      : entityStat + regularBonusAggregations[bonusId];

    return { [stat]: val };
  };

  return apply(entity, computeStat);
}

export function applyPilotBonuses(pilot: Pilot, bonuses: Bonus[]): Pilot {
  return applyBonuses(pilot, bonuses, pilot, (pilot, getStat) => ({
    ...pilot,
    ...getStat("armor", "pilot_armor"),
    ...getStat("eDefense", "pilot_edef"),
    ...getStat("evasion", "pilot_evasion"),
    ...getStat("maxHp", "pilot_hp"),
    ...getStat("speed", "pilot_speed"),
  }));
}
