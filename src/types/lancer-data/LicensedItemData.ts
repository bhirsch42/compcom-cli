import { CompendiumItem } from "./CompendiumItem";

export type LicensedItemData = CompendiumItem & {
  source: string;
  license: string;
  license_level: number;
  license_id?: string;
};
