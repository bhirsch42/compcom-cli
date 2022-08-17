import lancerData, { Bonus } from "lancer-data";
import {
  find,
  flatten,
  groupBy,
  isNil,
  map,
  prop,
  propEq,
  props,
  reject,
  sum,
} from "ramda";
import { StoreState } from "../../hooks/useStore";
import { ImportedPilot } from "../../types/Pilot";
const { rules, pilot_gear } = lancerData;

type DerivedPilotStat = "armor" | "eDefense" | "evasion" | "maxHp" | "speed";

export type Pilot = ImportedPilot & {
  grit: number;
  armor: number;
  eDefense: number;
  evasion: number;
  maxHp: number;
  speed: number;
};

type GroupedBonuses = Record<Bonus["id"], Bonus[]>;
type AggregatedBonuses = Record<Bonus["id"], number>;

type ComputeStat = (
  pilotStat: DerivedPilotStat,
  bonusId: Bonus["id"]
) => number;

const groupBonuses: (bonuses: Bonus[]) => GroupedBonuses = groupBy<
  Bonus,
  Bonus["id"]
>(prop("id"));

function aggregateGroupedBonuses(
  aggFn: (bonusValues: number[]) => number,
  groupedBonuses: GroupedBonuses
): AggregatedBonuses {
  return map<GroupedBonuses, AggregatedBonuses>(
    (groupedBonuses: Bonus[]) => aggFn(map(prop("val"), groupedBonuses)),
    groupedBonuses
  );
}

function applyPilotBonuses(pilot: Pilot, bonuses: Bonus[]): Pilot {
  const replaceBonuses = bonuses.filter((bonus) => bonus.replace);
  const regularBonuses = bonuses.filter((bonus) => !bonus.replace);

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

const compact = reject(isNil);

type SelectPilot = (pilotId: string) => (state: StoreState) => Pilot | null;

export const selectPilot: SelectPilot =
  (pilotId: string) => (state: StoreState) => {
    const importedPilot = find(propEq("id", pilotId), state.pilots.pilots);
    if (!importedPilot) return null;

    const grit = Math.ceil(importedPilot.level / 2);

    const allGearIds = compact(
      map(
        (gear) => (typeof gear === "string" ? null : gear?.id),
        flatten(
          props(
            ["armor", "weapons", "gear", "extendedGear", "extendedWeapons"],
            importedPilot.loadout
          )
        )
      )
    );

    const allGear = pilot_gear.filter((gear) => allGearIds.includes(gear.id));

    const allBonuses = flatten(compact(map((gear) => gear.bonuses, allGear)));

    const basePilot = {
      ...importedPilot,
      grit,
      maxHp: rules.base_pilot_hp + grit,
      eDefense: rules.base_pilot_edef,
      speed: rules.base_pilot_speed,
      evasion: rules.base_pilot_evasion,
      armor: 0,
    };

    return applyPilotBonuses(basePilot, allBonuses);
  };
