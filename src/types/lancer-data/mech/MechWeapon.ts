import { Damage } from "../Damage";
import { WeaponSize, WeaponType } from "../enums";
import { Range } from "../Range";
import { EquipmentData } from "./Equipment";
import { MechEquipmentData } from "./MechEquipment";
import { WeaponProfileData } from "./WeaponProfile";

export type MechWeaponSaveData = EquipmentData & {
  loaded: boolean;
  mod?: EquipmentData;
  customDamageType?: string;
  maxUseOverride?: number;
  selectedProfile: number;
};

export type MechWeaponData = MechEquipmentData & {
  mount: WeaponSize;
  type: WeaponType;
  skirmish?: boolean;
  barrage?: boolean;
  cost?: number;
  no_attack?: boolean;
  no_core_bonus?: boolean;
  on_attack?: string;
  on_hit?: string;
  on_crit?: string;
  damage?: Damage[];
  range?: Range[];
  profiles?: WeaponProfileData[];
  selected_profile: number;
};
