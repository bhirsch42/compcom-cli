import { ImageTag, MechType, MountType } from "../../enums";
import { LicensedItemData } from "../../LicensedItemData";
import { CoreSystemData } from "../CoreSystem";
import { FrameStats } from "./Stats";
import { FrameTraitData } from "./Trait";

export type FrameData = LicensedItemData & {
  mechtype: MechType[];
  license_level: number;
  mounts: MountType[];
  stats: FrameStats;
  traits: FrameTraitData[];
  core_system: CoreSystemData;
  specialty:
    | boolean
    | { source: string; min_rank: number; cumulative?: boolean };
  variant?: string;
  y_pos?: number;
  image_url?: string;
  other_art?: { tag?: ImageTag; src?: string; url?: string }[];
};
