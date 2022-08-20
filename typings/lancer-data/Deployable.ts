import { CompendiumItem } from "./CompendiumItem";
import { EntityStats } from "./EntityStats";
import { ActivationType } from "./enums";

export type DeployableData = CompendiumItem &
  EntityStats & {
    detail: string;
    type: string; // this is for UI furnishing only
    activation: ActivationType;
    resistances?: string[];
    instances?: number;
    deactivation?: ActivationType;
    recall?: ActivationType;
    redeploy?: ActivationType;
    size: number;
    cost?: number;
    pilot?: boolean;
    mech?: boolean;
  };
