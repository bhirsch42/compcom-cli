import { CrudDateTimes } from "../CrudDateTimes";
import { LoadoutDataWithIndex } from "./Loadout";

export type MechData = LoadoutDataWithIndex &
  CrudDateTimes & {
    id: string;
    name: string;
    notes: string;
    gm_note: string;
    portrait: string;
    cloud_portrait: string;
    frame: string;
    active: boolean;
    current_structure: number;
    current_move: number;
    boost: number;
    current_hp: number;
    overshield: number;
    current_stress: number;
    current_heat: number;
    current_repairs: number;
    current_overcharge: number;
    current_core_energy: number;
    statuses: string[];
    conditions: string[];
    resistances: string[];
    reactions: string[];
    burn: number;
    destroyed: boolean;
    defeat: string;
    activations: number;
    meltdown_imminent: boolean;
    reactor_destroyed: boolean;
    core_active: boolean;
    cc_ver: string;
  };
