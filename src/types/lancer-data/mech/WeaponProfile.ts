import { Action } from "../Action";
import { Bonus } from "../Bonus";
import { CounterData } from "../Counter";
import { Damage } from "../Damage";
import { DeployableData } from "../Deployable";
import { Range } from "../Range";
import { Synergy } from "../Synergy";

export type WeaponProfileData = {
  name: string;
  effect?: string;
  skirmish?: boolean;
  barrage?: boolean;
  cost?: number;
  on_attack?: string;
  on_hit?: string;
  on_crit?: string;
  damage?: Damage[];
  range?: Range[];
  actions?: Action[];
  bonuses?: Bonus[];
  synergies?: Synergy[];
  deployables?: DeployableData[];
  counters?: CounterData[];
  integrated?: string[];
  special_equipment?: string[];
};
