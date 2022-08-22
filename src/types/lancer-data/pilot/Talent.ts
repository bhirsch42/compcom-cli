import { CompendiumItemData } from "../CompendiumItem";

export type TalentRankData = CompendiumItemData & {
  exclusive: boolean;
};

export type TalentData = CompendiumItemData & {
  terse: string;
  ranks: TalentRankData[];
};
