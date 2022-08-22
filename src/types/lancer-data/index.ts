import { Manufacturer } from "./Manufacturer";
import { FrameRule } from "./mech/frame/Frame";
import { PilotEquipmentData } from "./PilotGear";
import { Rules } from "./Rules";
import { Skill } from "./Skill";
import lancerData from "lancer-data";
import { TalentData } from "./pilot/Talent";
import { Tag } from "./Tag";

export type LancerData = {
  rules: Rules;
  skills: Skill[];
  pilot_gear: PilotEquipmentData[];
  frames: FrameRule[];
  manufacturers: Manufacturer[];
  talents: TalentData[];
  tags: Tag[];
};

export default lancerData as LancerData;
