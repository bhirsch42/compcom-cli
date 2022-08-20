import { Rules } from "./Rules";
import { Skill } from "./Skill";
import { PilotEquipment } from "./PilotGear";
import { FrameRule } from "./Frame";
import { Manufacturer } from "./Manufacturer";

declare module "lancer-data" {
  export const rules: Rules;
  export const skills: Skill[];
  export const pilot_gear: PilotEquipment[];
  export const frames: FrameRule[];
  export const manufacturers: Manufacturer[];
}
