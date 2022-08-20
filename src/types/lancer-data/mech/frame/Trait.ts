import { Action } from "../../Action";
import { Bonus } from "../../Bonus";
import { CounterData } from "../../Counter";
import { DeployableData } from "../../Deployable";
import { Duration } from "../../enums";
import { Synergy } from "../../Synergy";

export type FrameTraitData = {
  name: string;
  description: string;
  use?: Duration;
  actions?: Action[];
  bonuses?: Bonus[];
  synergies?: Synergy[];
  deployables?: DeployableData[];
  counters?: CounterData[];
  integrated?: string[];
  special_equipment?: string[];
};
