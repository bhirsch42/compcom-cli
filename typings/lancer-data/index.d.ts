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

  export type Rules = {
    base_structure: number;
    base_stress: number;
    base_grapple: number;
    base_ram: number;
    base_pilot_hp: number;
    base_pilot_evasion: number;
    base_pilot_edef: number;
    base_pilot_speed: number;
    minimum_pilot_skills: number;
    minimum_mech_skills: number;
    minimum_pilot_talents: number;
    trigger_bonus_per_rank: number;
    max_trigger_rank: number;
    max_pilot_level: number;
    max_pilot_weapons: number;
    max_pilot_armor: number;
    max_pilot_gear: number;
    max_frame_size: number;
    max_mech_armor: number;
    max_hase: number;
    mount_fittings: MountFittings;
    overcharge: string[];
    skill_headers: SkillHeader[];
  };

  export type MountFittings = {
    Auxiliary: string[];
    Main: string[];
    Flex: string[];
    Heavy: string[];
  };

  export type SkillHeader = {
    attr: string;
    description: string;
  };

  export type SkillRule = {
    id: string;
    name: string;
    description: string;
    detail: string;
    family: string;
  };

  export type PilotGearAction = {
    name: string;
    activation: string;
    detail: string;
    pilot: boolean;
    range?: Damage[];
    damage?: Damage[];
  };

  export type Damage = {
    type: string;
    val: number;
  };

  export type Range = {
    type: string;
    val: number;
  };

  export type PilotGearBonus = {
    id:
      | "pilot_hp"
      | "pilot_evasion"
      | "pilot_edef"
      | "pilot_speed"
      | "pilot_armor";
    val: number;
    replace?: boolean;
  };

  export type MechBonus = {
    id: string;
    val?: number;
  };

  export type Deployable = {
    name: string;
    type: string;
    detail: string;
    pilot: boolean;
    actions: DeployableAction[];
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

  export type DeployableAction = {
    name: string;
    activation: Activation;
    detail: string;
    pilot: boolean;
  };

  export type Tag = {
    id: string;
    name: string;
    description: string;
    filter_ignore?: boolean;
    hidden?: boolean;
  };

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

  export type Art = {
    tag: string;
    src: string;
  };

  export type ActiveAction = {
    name: string;
    activation: ActivationType;
    frequency?: string; // has some magic values
    trigger?: string;
    detail: string;
    init?: string;
    tech_attack?: boolean;
  };

  export type PassiveAction = {
    name: string;
    activation: ActivationType;
    detail: string;
    pilot?: boolean;
  };

  export type Counter = {
    id: string;
    name: string;
    default_value: number;
    min: number;
    max: number;
    level?: number;
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

  export type FrameStats = {
    size: number;
    structure: number;
    stress: number;
    armor: number;
    hp: number;
    evasion: number;
    edef: number;
    heatcap: number;
    repcap: number;
    sensor_range: number;
    tech_attack: number;
    save: number;
    speed: number;
    sp: number;
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

  export type Manufacturer = {
    id: string;
    name: string;
    logo: string;
    light: string;
    dark: string;
    quote: string;
    description: string;
  };

  export type Status = {
    name: string;
    icon: string;
    type: "Condition" | "Status";
    terse: string;
    exclusive?: "Mech" | "Pilot";
    effects: string;
  };

  export const rules: Rules;
  export const skills: SkillRule[];
  export const pilot_gear: PilotGearRule[];
  export const frames: FrameRule[];
  export const manufacturers: Manufacturer[];
}
