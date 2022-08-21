import { CombatStats } from "./CombatStats";
import { DeployedData } from "./DeployedData";

export type ActiveStateData = {
  active_mech_id: string;
  remote_mech_id: string;
  stage: string;
  mission: number;
  turn: number;
  actions: number;
  braced: boolean;
  overcharged: boolean;
  prepare: boolean;
  bracedCooldown: boolean;
  redundant: boolean;
  mounted: boolean;
  stats: CombatStats;
  deployed: DeployedData[];
};
