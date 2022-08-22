import { any, find, map, propEq } from "ramda";
import { StoreState } from "../../../hooks/useStore";
import { applyMechBonuses } from "../../../lib/applyBonuses";
import lancerData from "../../../types/lancer-data";
import { FrameRule } from "../../../types/lancer-data/mech/frame/Frame";
import { FrameStats } from "../../../types/lancer-data/mech/frame/Stats";
import { MechData } from "../../../types/lancer-data/mech/Mech";
import { PilotData } from "../../../types/lancer-data/pilot/Pilot";
import { getGrit } from "../selectPilot/getGrit";
import { getPilotBonuses } from "../selectPilot/getPilotBonuses";
import { getLoadout, Loadout } from "./getLoadout";
import { getMechBonuses } from "./getMechBonuses";
const { frames } = lancerData;

export type Mech = Omit<MechData, "frame" | "loadouts"> & {
  frame: FrameRule;
  stats: FrameStats;
  loadouts: Loadout[];
  activeLoadout: Loadout;
  maxCoreEnergy: number;
  attackBonus: number;
  limitedSystemBonus: number;
};

type SelectMech = (mechId: string) => (state: StoreState) => Mech | null;

function applyPilotSkills(mech: Mech, pilotData: PilotData): Mech {
  const [hull, agility, systems, engineering] = pilotData.mechSkills;
  const grit = getGrit(pilotData);
  const stats = mech.stats;

  return {
    ...mech,
    stats: {
      ...stats,
      hp: stats.hp + 2 * hull + grit,
      repcap: stats.repcap + hull,
      evasion: stats.evasion + agility,
      edef: stats.edef + systems,
      tech_attack: stats.tech_attack + systems,
      heatcap: stats.heatcap + engineering,
    },
    attackBonus: mech.attackBonus + grit,
    limitedSystemBonus: Math.floor(engineering / 2),
  };
}

export const selectMech: SelectMech = (mechId) => (state) => {
  const pilotData = find(
    (pilot) => any(propEq("id", mechId), pilot.mechs),
    state.pilots.pilots
  );

  if (!pilotData) return null;

  const mechData = find(propEq("id", mechId), pilotData.mechs);

  if (!mechData) return null;

  const frame = find(propEq("id", mechData.frame), frames);

  if (!frame) return null;

  const loadouts = map(getLoadout, mechData.loadouts);
  const activeLoadout = loadouts[mechData.active_loadout_index];

  let mech: Mech = {
    ...mechData,
    frame,
    stats: frame.stats,
    loadouts,
    activeLoadout,
    maxCoreEnergy: 1,
    attackBonus: 0,
    limitedSystemBonus: 0,
  };

  mech = applyPilotSkills(mech, pilotData);

  const bonuses = [...getMechBonuses(mech), ...getPilotBonuses(pilotData)];

  return applyMechBonuses(mech, pilotData, bonuses);
};
