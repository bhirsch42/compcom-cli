declare module "lancer-data" {
  import {
    Duration,
    ActivationType,
    MountType,
    FittingSize,
    WeaponSize,
    WeaponType,
    ItemType,
    SystemType,
    SkillFamily,
    RangeType,
    DamageType,
    MechType,
    HASE,
    ReserveType,
    OrgType,
    EncounterSide,
    ImageTag,
    DeployableType,
  } from "./enums";

  export * from "./enums";

  export type SkillRule = {
    id: string;
    name: string;
    description: string;
    detail: string;
    family: string;
  };

  export type Deployable = {
    name: string;
    type: string;
    detail: string;
    pilot: boolean;
    actions: ActiveAction[];
  };

  export interface SystemDeployable {
    name: string;
    type: DeployableType;
    range?: Range[];
    detail: string;
    instances?: number;
    size?: number;
    hp?: number;
    evasion?: number;
    recall?: ActivationType;
    redeploy?: ActivationType;
    activation?: ActivationType;
    edef?: number;
    actions?: ActiveAction[];
    cost?: number;
    counters?: Counter[];
    tags?: Tag[];
    deactivation?: ActivationType;
  }

  export enum PilotGearType {
    Armor = "Armor",
    Gear = "Gear",
    Weapon = "Weapon",
  }

  export type Equipment = {
    id: string;
    destroyed: boolean;
    cascading: boolean;
    note: string;
    uses?: number;
    flavorName?: string;
    flavorDescription?: string;
    customDamageType?: string;
  };

  export type PilotGearRule = Equipment & {
    name: string;
    type: PilotGearType;
    description: string;
    tags?: Tag[];
    range?: Range[];
    damage?: Damage[];
    effect?: string;
    bonuses?: PilotGearBonus[];
    actions?: PilotGearAction[];
    deployables?: Deployable[];
  };

  export type Range = {
    type: RangeType;
    val: number;
  };

  export type CoreSystemDeployable = {
    name: string;
    type: DeployableType;
    detail: string;
    activation: Activation;
    recall: Activation;
    redeploy: Activation;
    size: number;
    hp: string;
  };

  export type CoreSystem = {
    name: string;
    active_name: string;
    active_effect: string;
    use?: Duration;
    activation: ActivationType;
    active_synergies?: ActiveSynergyElement[];
    description?: string;
    deactivation?: ActivationType;
    integrated?: string[];
    active_actions?: ActiveAction[];
    passive_name?: string;
    passive_effect?: string;
    passive_actions?: PassiveAction[];
    deployables?: CoreSystemDeployable[];
    active_bonuses?: MechBonus[];
  };

  export type FrameStats = EntityStats & {
    size: number;
    structure: number;
    stress: number;
    sp: number;
  };

  export type Trait = {
    name: string;
    description: string;
    use?: string;
    bonuses?: MechBonus[];
    synergies?: Synergy[];
    actions?: ActiveAction[];
  };

  export type FrameRule = {
    id: string;
    license_level: number;
    source: string;
    name: string;
    mechtype: MechType[];
    y_pos: number;
    description: string;
    mounts: MountType[];
    stats: FrameStats;
    traits: Trait[];
    core_system: CoreSystem;
    image_url: string;
    license_id: string;
    other_art?: Art[];
    data_type?: string;
    counters?: Counter[];
  };

  export const rules: Rules;
  export const skills: SkillRule[];
  export const pilot_gear: PilotGearRule[];
  export const frames: FrameRule[];
  export const manufacturers: Manufacturer[];
}
