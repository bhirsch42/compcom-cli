import { groupBy, map, prop, sum } from "ramda";
import { Mech } from "../store/selectors/selectMech";
import { Pilot } from "../store/selectors/selectPilot";
import { getGrit } from "../store/selectors/selectPilot/getGrit";
import { Bonus, BonusId } from "../types/lancer-data/Bonus";
import { PilotData } from "../types/lancer-data/pilot/Pilot";
import evaluateModifier from "./evaluateModifier";

type EvaluatedBonus = Omit<Bonus, "val"> & { val: number };

type GroupedBonuses = Record<EvaluatedBonus["id"], EvaluatedBonus[]>;
type AggregatedBonuses = Record<EvaluatedBonus["id"], number>;

type ComputeStat = (initialValue: number, bonusId: BonusId) => number;

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

function evaluateBonus(bonus: Bonus, pilot: PilotData): EvaluatedBonus {
  return {
    ...bonus,
    val: evaluateModifier(bonus.val, {
      grit: getGrit(pilot),
      ll: pilot.level,
    }),
  };
}

function applyBonuses<T>(
  pilot: PilotData,
  bonuses: Bonus[],
  entity: T,
  apply: (entity: T, getStat: ComputeStat) => T
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

  const computeStat: ComputeStat = (initialValue: number, bonusId: BonusId) => {
    return replaceBonusAggregations[bonusId]
      ? replaceBonusAggregations[bonusId]
      : initialValue + (regularBonusAggregations[bonusId] || 0);
  };

  return apply(entity, computeStat);
}

export function applyPilotBonuses(
  pilot: Pilot,
  pilotData: PilotData,
  bonuses: Bonus[]
): Pilot {
  return applyBonuses(pilotData, bonuses, pilot, (pilot, stat) => ({
    ...pilot,
    armor: stat(pilot.armor, "pilot_armor"),
    eDefense: stat(pilot.eDefense, "pilot_edef"),
    evasion: stat(pilot.evasion, "pilot_evasion"),
    maxHp: stat(pilot.maxHp, "pilot_hp"),
    speed: stat(pilot.speed, "pilot_speed"),
  }));
}

export function applyMechBonuses(
  mech: Mech,
  pilotData: PilotData,
  bonuses: Bonus[]
): Mech {
  return applyBonuses(pilotData, bonuses, mech, (mech, stat) => ({
    ...mech,
    stats: {
      ...mech.stats,
      hp: stat(mech.stats.hp, "hp"),
      armor: mech.stats.armor && stat(mech.stats.armor, "armor"),
      heatcap: mech.stats.heatcap && stat(mech.stats.heatcap, "heatcap"),
      edef: mech.stats.edef && stat(mech.stats.edef, "edef"),
      size: mech.stats.size && stat(mech.stats.size, "size"),
      evasion: mech.stats.evasion && stat(mech.stats.evasion, "evasion"),
    },
    maxCoreEnergy: stat(mech.maxCoreEnergy, "core_power"),
    attackBonus: stat(mech.attackBonus, "attack"),
  }));
}
