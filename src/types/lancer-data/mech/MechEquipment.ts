import { LicensedItemData } from "../LicensedItemData";
import { TagRef } from "../Tag";

export type MechEquipmentData = LicensedItemData & {
  sp: number;
  tags?: TagRef[];
  effect: string;
  talent_item?: boolean;
  frame_id?: boolean;
  // TODO: expand (this comment copied from original compcon repo)
  ammo?: any[];
  no_mods?: boolean;
  no_bonuses?: boolean;
  no_synergies?: boolean;
};
