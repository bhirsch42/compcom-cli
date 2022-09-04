import { groupBy, map, prop, sum } from "ramda";
import { Mech } from "../store/selectors/selectMech";
import { Pilot } from "../store/selectors/selectPilot";
import { getGrit } from "../store/selectors/selectPilot/getGrit";
import { Bonus, BonusId } from "../types/lancer-data/Bonus";
import { FrameStats } from "../types/lancer-data/mech/frame/Stats";
import { PilotData } from "../types/lancer-data/pilot/Pilot";
import evaluateModifier from "./evaluateModifier";

type EvaluatedBonus = Omit<Bonus, "val"> & { val: number };
type GroupedBonuses = Record<EvaluatedBonus["id"], EvaluatedBonus[]>;
type AggregatedBonuses = Record<EvaluatedBonus["id"], number>;
type ApplyBonus = (bonusId: BonusId, initialValue: number) => number;

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

function getApplyBonus(pilotData: PilotData, bonuses: Bonus[]): ApplyBonus {
  const evaluatedBonuses = bonuses.map((bonus) =>
    evaluateBonus(bonus, pilotData)
  );

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

  return (bonusId, initialValue) => {
    return replaceBonusAggregations[bonusId]
      ? replaceBonusAggregations[bonusId]
      : initialValue + (regularBonusAggregations[bonusId] || 0);
  };
}

export function applyPilotBonuses(
  pilot: Pilot,
  pilotData: PilotData,
  bonuses: Bonus[]
): Pilot {
  const applyBonus = getApplyBonus(pilotData, bonuses);

  return {
    ...pilot,
    armor: applyBonus("pilot_armor", pilot.armor),
    eDefense: applyBonus("pilot_edef", pilot.eDefense),
    evasion: applyBonus("pilot_evasion", pilot.evasion),
    maxHp: applyBonus("pilot_hp", pilot.maxHp),
    speed: applyBonus("pilot_speed", pilot.speed),
  };
}

export function applyMechBonuses(
  mech: Mech,
  pilotData: PilotData,
  bonuses: Bonus[]
): Mech {
  const applyBonus = getApplyBonus(pilotData, bonuses);

  const stats: FrameStats = {
    ...mech.stats,
    hp: applyBonus("hp", mech.stats.hp),
    armor: applyBonus("armor", mech.stats.armor),
    heatcap: applyBonus("heatcap", mech.stats.heatcap),
    edef: applyBonus("edef", mech.stats.edef),
    size: applyBonus("size", mech.stats.size),
    evasion: applyBonus("evasion", mech.stats.evasion),
    sensor_range: applyBonus("sensor", mech.stats.sensor_range),
    save: applyBonus("save", mech.stats.save),
  };

  return {
    ...mech,
    stats,
    maxCoreEnergy: applyBonus("core_power", mech.maxCoreEnergy),
    attackBonus: applyBonus("attack", mech.attackBonus),
  };
}
