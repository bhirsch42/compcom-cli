import { Action } from "./Action";
import { Bonus } from "./Bonus";
import { CompendiumItemData } from "./CompendiumItem";
import { Damage } from "./Damage";
import { DeployableData } from "./Deployable";
import { Range } from "./Range";
import { TagData } from "./Tag";

export enum PilotGearType {
  Armor = "Armor",
  Gear = "Gear",
  Weapon = "Weapon",
}

export type PilotEquipmentData = CompendiumItemData & {
  name: string;
  type: PilotGearType;
  description: string;
  tags?: TagData[];
  range?: Range[];
  damage?: Damage[];
  effect?: string;
  bonuses?: Bonus[];
  actions?: Action[];
  deployables?: DeployableData[];
};
