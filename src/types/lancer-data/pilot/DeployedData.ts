import { DeployableData } from "../Deployable";

export type DeployedData = {
  id: string;
  data: DeployableData;
  assigned_name: string;
  current_hp: number;
  current_duration?: number;
  overshield?: number;
  Destroyed?: boolean;
};
