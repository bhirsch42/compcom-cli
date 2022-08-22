import { DamageType, RangeType, WeaponSize, WeaponType } from "./enums";

export type BonusId =
  | "ai_cap"
  | "armor"
  | "cb_point"
  | "cheap_stress"
  | "cheap_struct"
  | "core_power"
  | "deployable_hp"
  | "drone_hp"
  | "edef"
  | "evasion"
  | "heatcap"
  | "hp"
  | "license_point"
  | "limited_bonus"
  | "mech_skill_point"
  | "overcharge"
  | "pilot_armor"
  | "pilot_edef"
  | "pilot_evasion"
  | "pilot_gear"
  | "pilot_hp"
  | "pilot_speed"
  | "range"
  | "repcap"
  | "save"
  | "size"
  | "skill_point"
  | "talent_point";

export type Bonus = {
  id: BonusId;
  val: string | number | string[];
  damage_types?: DamageType[];
  range_types?: RangeType[];
  weapon_types?: WeaponType[];
  weapon_sizes?: WeaponSize[];
  overwrite?: boolean;
  replace?: boolean;
};
