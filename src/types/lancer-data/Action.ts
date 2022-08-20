import { Damage } from "./Damage";
import { ActivationType } from "./enums";
import { Range } from "./Range";

export type Action = {
  id?: string;
  name: string;
  activation: ActivationType;
  cost?: number;
  frequency?: string;
  init?: string;
  trigger?: string;
  terse?: string;
  detail: string;
  pilot?: boolean;
  mech?: boolean;
  damage?: Damage[];
  range?: Range[];
  hide_active?: boolean;
  synergy_locations?: string[];
  confirm?: string[];
  log?: string;
  ignore_used?: boolean;
  heat_cost?: number;
  tech_attack?: boolean;
};
