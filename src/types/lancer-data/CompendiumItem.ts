import { Action } from "./Action";
import { Bonus } from "./Bonus";
import { CounterData } from "./Counter";
import { DeployableData } from "./Deployable";
import { Synergy } from "./Synergy";
import { TagRef } from "./Tag";

export type CompendiumItemData = {
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
  tags?: TagRef[];
};
