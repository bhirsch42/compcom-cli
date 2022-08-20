import { Manufacturer } from "./Manufacturer";
import { FrameRule } from "./mech/frame/Frame";
import { PilotEquipment } from "./PilotGear";
import { Rules } from "./Rules";
import { Skill } from "./Skill";
import lancerData from "lancer-data";

export type LancerData = {
  rules: Rules;
  skills: Skill[];
  pilot_gear: PilotEquipment[];
  frames: FrameRule[];
  manufacturers: Manufacturer[];
};

export default lancerData as LancerData;
