import { CompendiumItemData } from "../CompendiumItem";

export type CoreBonusData = CompendiumItemData & {
  source: string;
  effect: string;
  mounted_effect?: string;
};
