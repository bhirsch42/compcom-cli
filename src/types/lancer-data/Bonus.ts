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
  | "talent_point"
  | "attack"
  | "damage"
  | "structure"
  | "stress"
  | "speed"
  | "sensor"
  | "tech_attack"
  | "grapple"
  | "ram"
  | "sp"
  | "deployable_size"
  | "deployable_charges"
  | "deployable_armor"
  | "deployable_evasion"
  | "deployable_edef"
  | "deployable_heatcap"
  | "deployable_repcap"
  | "deployable_sensor_range"
  | "deployable_tech_attack"
  | "deployable_save"
  | "deployable_speed"
  | "drone_size"
  | "drone_charges"
  | "drone_armor"
  | "drone_evasion"
  | "drone_edef"
  | "drone_heatcap"
  | "drone_repcap"
  | "drone_sensor_range"
  | "drone_tech_attack"
  | "drone_save"
  | "drone_speed";

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
