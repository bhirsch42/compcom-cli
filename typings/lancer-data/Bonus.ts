import { DamageType, RangeType, WeaponSize, WeaponType } from "./enums";

export type Bonus = {
  id: string;
  val: string | number | string[];
  damage_types?: DamageType[];
  range_types?: RangeType[];
  weapon_types?: WeaponType[];
  weapon_sizes?: WeaponSize[];
  overwrite?: boolean;
  replace?: boolean;
};
