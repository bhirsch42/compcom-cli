import { Manufacturer } from "./Manufacturer";
import { FrameRule } from "./mech/frame/Frame";
import { PilotEquipmentData } from "./PilotGear";
import { Rules } from "./Rules";
import { Skill } from "./Skill";
import lancerData from "lancer-data";
import { TalentData } from "./pilot/Talent";
import { TagData } from "./Tag";
import { MechSystemData } from "./mech/MechSystem";
import { Bonus } from "./Bonus";
import { CoreBonusData } from "./pilot/CoreBonus";
import { MechWeaponData } from "./mech/MechWeapon";

export type LancerData = {
  core_bonuses: CoreBonusData[];
  frames: FrameRule[];
  manufacturers: Manufacturer[];
  pilot_gear: PilotEquipmentData[];
  rules: Rules;
  skills: Skill[];
  systems: MechSystemData[];
  tags: TagData[];
  talents: TalentData[];
  weapons: MechWeaponData[];
};

export default lancerData as LancerData;
