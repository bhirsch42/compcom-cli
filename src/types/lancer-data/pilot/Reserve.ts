import { Action } from "../Action";
import { Bonus } from "../Bonus";
import { CounterData } from "../Counter";
import { DeployableData } from "../Deployable";
import { Synergy } from "../Synergy";

export type ReserveData = {
  id: string;
  type?: string;
  name?: string;
  label?: string;
  description?: string;
  resource_name: string;
  resource_note: string;
  resource_cost: string;
  used: boolean;
  consumable: boolean;
  actions?: Action[];
  bonuses?: Bonus[];
  synergies?: Synergy[];
  deployables?: DeployableData[];
  counters?: CounterData[];
  integrated?: string[];
  special_equipment?: string[];
};
