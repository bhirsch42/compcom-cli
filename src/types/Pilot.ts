import { Mech } from "../mech";
import { PilotGear } from "./PilotGear";
import { PilotSkill } from "./Skill";

type IActiveStateData = never;
type IClockData = never;
type ICombatStats = never;
type ICounterSaveData = never;
type IOrganizationData = never;
type IPilotBondData = never;
type IPilotLoadoutData = never;
type IRankedData = never;
type IReserveData = never;
type IUnlockData = never;
type BondPower = never;
type BrewInfo = never;

type PilotLoadout = {
  id: string;
  name: "Primary" | "Secondary";
  armor: (PilotGear | null)[];
  weapons: (PilotGear | null)[];
  gear: (PilotGear | null)[];
  extendedWeapons: (PilotGear | null)[];
  extendedGear: (PilotGear | null)[];
};

export type License = {
  id: string;
  rank: number;
};

export type Pilot = {
  minorIdeal: string;
  bondAnswers: string[];
  maxStress: number;
  powerSelections: number;
  bondId?: string;
  xp: number;
  stress: number;
  isBroken: boolean;
  burdens: IClockData[];
  bondPowers: BondPower[];
  clocks: IClockData[];
  pilotBond: IPilotBondData;
  remoteIID: string;
  remoteKey: string;
  shareCodeExpiry: string;
  shareCode: string;
  isRemoteResource: boolean;
  deleteTime: string;
  id: string;
  level: number;
  callsign: string;
  name: string;
  player_name: string;
  status: string;
  text_appearance: string;
  notes: string;
  history: string;
  quirks: string[];
  current_hp: number;
  background: string;

  resistances: string[];
  special_equipment: IUnlockData;
  mechs: Mech[];
  cc_ver: string;
  brews: BrewInfo[];
  state: IActiveStateData;
  combat_history: ICombatStats;
  dead: boolean;

  // SaveController
  lastModified: string;
  isDeleted: boolean;
  expireTime: string;

  // PortraitController
  portrait: string;
  cloud_portrait: string;

  // CloudController
  lastUpdate_cloud: string;
  resourceUri: string;
  lastSync: string;

  skills: PilotSkill[];

  // TalentsController
  talents: IRankedData[];

  // MechSkillsController
  mechSkills: number[];

  // CounterController
  custom_counters: any[];
  counter_data: ICounterSaveData[];

  // CoreBonusController
  core_bonuses: string[];

  // LicenseController
  licenses: License[];

  // ReservesController
  reserves: IReserveData[];
  orgs: IOrganizationData[];

  // GroupConteroller
  group: string;
  sort_index: number;

  // PilotLoadoutController
  loadout: PilotLoadout;
};

export function parsePilots(pilotData: string): Pilot[] {
  return JSON.parse(pilotData) as Pilot[];
}
