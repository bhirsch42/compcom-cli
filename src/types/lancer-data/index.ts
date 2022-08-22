import { Manufacturer } from "./Manufacturer";
import { FrameRule } from "./mech/frame/Frame";
import { PilotEquipmentData } from "./PilotGear";
import { Rules } from "./Rules";
import { Skill } from "./Skill";
import lancerData from "lancer-data";
import { TalentData } from "./pilot/Talent";
import { Tag } from "./Tag";
import { MechSystemData } from "./mech/MechSystem";

export type LancerData = {
  rules: Rules;
  skills: Skill[];
  pilot_gear: PilotEquipmentData[];
  frames: FrameRule[];
  manufacturers: Manufacturer[];
  talents: TalentData[];
  tags: Tag[];
  systems: MechSystemData[];
};

export default lancerData as LancerData;
