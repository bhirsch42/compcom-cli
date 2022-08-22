import { LicensedItemData } from "../LicensedItemData";
import { Tag } from "../Tag";

export type MechEquipmentData = LicensedItemData & {
  sp: number;
  tags: Tag[];
  effect: string;
  talent_item?: boolean;
  frame_id?: boolean;
  // TODO: expand
  ammo?: any[];
  no_mods?: boolean;
  no_bonuses?: boolean;
  no_synergies?: boolean;
};
