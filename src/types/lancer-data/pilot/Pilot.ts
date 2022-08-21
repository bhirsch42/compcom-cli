import { BrewInfo } from "../BrewInfo";
import { MechData } from "../mech/Mech";
import { ActiveStateData } from "./ActiveState";
import { BondPower } from "./BondPower";
import { ClockData } from "./Clock";
import { CombatStats } from "./CombatStats";
import { CounterSaveData } from "./CounterSave";
import { Organization } from "./Organization";
import { PilotBondData } from "./PilotBond";
import { PilotLoadoutData } from "./PilotLoadout";
import { RankedData } from "./Ranked";
import { ReserveData } from "./Reserve";
import { UnlockData } from "./Unlock";

export type PilotData = {
  minorIdeal: string;
  bondAnswers: string[];
  maxStress: number;
  powerSelections: number;
  bondId?: string;
  xp: number;
  stress: number;
  isBroken: boolean;
  burdens: ClockData[];
  bondPowers: BondPower[];
  clocks: ClockData[];
  pilotBond: PilotBondData;
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
  special_equipment: UnlockData;
  mechs: MechData[];
  cc_ver: string;
  brews: BrewInfo[];
  state: ActiveStateData;
  combat_history: CombatStats;
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

  // SkillsController
  skills: RankedData[];

  // TalentsController
  talents: RankedData[];

  // MechSkillsController
  mechSkills: number[];

  // CounterController
  custom_counters: any[];
  counter_data: CounterSaveData[];

  // CoreBonusController
  core_bonuses: string[];

  // LicenseController
  licenses: RankedData[];

  // ReservesController
  reserves: ReserveData[];
  orgs: Organization[];

  // GroupConteroller
  group: string;
  sort_index: number;

  // PilotLoadoutController
  loadout: PilotLoadoutData;
};
