import { EntityStats } from "../../EntityStats";

export type FrameStats = EntityStats & {
  size: number;
  structure: number;
  stress: number;
  sp: number;
};
