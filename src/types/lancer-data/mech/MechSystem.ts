import { SystemType } from "../enums";
import { MechEquipmentData } from "./MechEquipment";

export type MechSystemData = MechEquipmentData & {
  type: SystemType;
};
