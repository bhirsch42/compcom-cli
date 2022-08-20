import { EquipmentData } from "./Equipment";

export type MechWeaponData = EquipmentData & {
  loaded: boolean;
  mod?: EquipmentData;
  customDamageType?: string;
  maxUseOverride?: number;
  selectedProfile: number;
};
