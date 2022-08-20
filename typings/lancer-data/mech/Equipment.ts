export type EquipmentData = {
  id: string;
  destroyed: boolean;
  cascading: boolean;
  note: string;
  uses?: number;
  flavorName?: string;
  flavorDescription?: string;
  customDamageType?: string;
};
