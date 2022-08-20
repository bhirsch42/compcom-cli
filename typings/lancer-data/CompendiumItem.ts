import { Action } from "./Action";
import { Bonus } from "./Bonus";
import { CounterData } from "./Counter";
import { DeployableData } from "./Deployable";
import { Synergy } from "./Synergy";
import { Tag } from "./Tag";

export type CompendiumItem = {
  id: string;
  name: string;
  description: string;
  actions?: Action[];
  bonuses?: Bonus[];
  synergies?: Synergy[];
  deployables?: DeployableData[];
  counters?: CounterData[];
  special_equipment?: string[];
  integrated?: string[];
  brew?: string;
  tags?: Tag[];
};
