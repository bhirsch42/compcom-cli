declare module "lancer-data" {
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

  export type Bonus = {
    id:
      | "pilot_hp"
      | "pilot_evasion"
      | "pilot_edef"
      | "pilot_speed"
      | "pilot_armor";
    val: number;
    replace?: boolean;
  };

  export type Deployable = {
    name: string;
    type: string;
    detail: string;
    pilot: boolean;
    actions: DeployableAction[];
  };

  export type DeployableAction = {
    name: string;
    activation: string;
    detail: string;
    pilot: boolean;
  };

  export type Tag = {
    id: string;
    val?: number;
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
    bonuses?: Bonus[];
    actions?: PilotGearAction[];
    deployables?: Deployable[];
  };

  export enum MechType {
    Artillery = "Artillery",
    Balanced = "Balanced",
    Controller = "Controller",
    Defender = "Defender",
    Striker = "Striker",
    Support = "Support",
  }

  export enum Mount {
    AuxAux = "Aux/Aux",
    Flex = "Flex",
    Heavy = "Heavy",
    Main = "Main",
    MainAux = "Main/Aux",
  }

  export type Art = {
    tag: string;
    src: string;
  };

  export type Counter = {
    id: string;
    name: string;
    default_value: number;
    min: number;
    max: number;
    level?: number;
  };

  export type Frame = {
    id: string;
    license_level: number;
    source: string;
    name: string;
    mechtype: MechType[];
    y_pos: number;
    description: string;
    mounts: Mount[];
    stats: { [key: string]: number };
    traits: Trait[];
    // core_system: CoreSystem;
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

  export const rules: Rules;
  export const skills: SkillRule[];
  export const pilot_gear: PilotGearRule[];
  export const frames: Frame[];
  export const manufacturers: Manufacturer[];
}
