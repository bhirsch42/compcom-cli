import { EquipmentData } from "../mech/Equipment";

export type PilotLoadoutData = {
  id: string;
  name: string;
  armor: (EquipmentData | null)[];
  weapons: (EquipmentData | null)[];
  gear: (EquipmentData | null)[];
  extendedWeapons: (EquipmentData | null)[];
  extendedGear: (EquipmentData | null)[];
};
