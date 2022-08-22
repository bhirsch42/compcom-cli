import { EntityStats } from "../../EntityStats";

export type FrameStats = Required<EntityStats> & {
  size: number;
  structure: number;
  stress: number;
  sp: number;
};
