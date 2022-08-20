import { CompendiumItemData } from "./CompendiumItem";

export type LicensedItemData = CompendiumItemData & {
  source: string;
  license: string;
  license_level: number;
  license_id?: string;
};
