// To parse this data:
//
//   import { Convert, Info, Rules, Tables } from "./file";
//
//   const actions = Convert.toActions(json);
//   const backgrounds = Convert.toBackgrounds(json);
//   const coreBonuses = Convert.toCoreBonuses(json);
//   const environments = Convert.toEnvironments(json);
//   const factions = Convert.toFactions(json);
//   const frames = Convert.toFrames(json);
//   const glossary = Convert.toGlossary(json);
//   const info = Convert.toInfo(json);
//   const manufacturers = Convert.toManufacturers(json);
//   const mods = Convert.toMods(json);
//   const pilotGear = Convert.toPilotGear(json);
//   const reserves = Convert.toReserves(json);
//   const rules = Convert.toRules(json);
//   const sitreps = Convert.toSitreps(json);
//   const skills = Convert.toSkills(json);
//   const statuses = Convert.toStatuses(json);
//   const systems = Convert.toSystems(json);
//   const tables = Convert.toTables(json);
//   const tags = Convert.toTags(json);
//   const talents = Convert.toTalents(json);
//   const weapons = Convert.toWeapons(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Actions {
    id:                 string;
    name:               string;
    activation:         Activation;
    terse:              string;
    detail:             string;
    pilot?:             boolean;
    mech?:              boolean;
    hide_active?:       boolean;
    synergy_locations?: string[];
    confirm?:           string[];
    ignore_used?:       boolean;
}

export enum Activation {
    Downtime = "Downtime",
    Free = "Free",
    Full = "Full",
    FullTech = "Full Tech",
    Invade = "Invade",
    Move = "Move",
    Protocol = "Protocol",
    Quick = "Quick",
    QuickTech = "Quick Tech",
    Reaction = "Reaction",
}

export interface Environments {
    id:          string;
    name:        string;
    description: string;
}

export interface CoreBonuses {
    id:              string;
    name:            string;
    source:          Source;
    effect:          string;
    description:     string;
    mounted_effect?: string;
    bonuses?:        CoreBonusBonus[];
    synergies?:      ActiveSynergyElement[];
    actions?:        Actiaction[];
}

export interface Actiaction {
    name:         string;
    activation:   Activation;
    frequency?:   Frequency;
    trigger?:     string;
    detail:       string;
    init?:        string;
    tech_attack?: boolean;
}

export enum Frequency {
    The1Round = "1/round",
    Unlimited = "Unlimited",
}

export interface CoreBonusBonus {
    id:            string;
    val:           string[] | boolean | number;
    weapon_types?: AllowedTypeElement[];
    range_types?:  RangeTypeElement[];
}

export enum RangeTypeElement {
    Blast = "Blast",
    Burn = "Burn",
    Burst = "Burst",
    Cone = "Cone",
    Energy = "Energy",
    Explosive = "Explosive",
    Heat = "Heat",
    Kinetic = "Kinetic",
    Line = "Line",
    Range = "Range",
    Threat = "Threat",
    TypeKinetic = "kinetic",
    TypeVariable = "variable",
    Variable = "Variable",
}

export enum AllowedTypeElement {
    Any = "any",
    Cannon = "Cannon",
    Cqb = "CQB",
    Empty = "???",
    Launcher = "Launcher",
    Melee = "Melee",
    Nexus = "Nexus",
    Ranged = "Ranged",
    Rifle = "Rifle",
    Special = "Special",
    SpoolWeapon = "Spool Weapon",
}

export enum Source {
    Empty = "",
    Gms = "GMS",
    Ha = "HA",
    Horus = "HORUS",
    IPSN = "IPS-N",
    Ssc = "SSC",
}

export interface ActiveSynergyElement {
    locations: string[];
    detail:    string;
}

export interface Frames {
    id:            string;
    license_level: number;
    source:        Source;
    name:          string;
    mechtype:      Mechtype[];
    y_pos:         number;
    description:   string;
    mounts:        AllowedSizeElement[];
    stats:         { [key: string]: number };
    traits:        Trait[];
    core_system:   CoreSystem;
    image_url:     string;
    license_id:    string;
    other_art?:    OtherArt[];
    data_type?:    string;
    counters?:     Counter[];
}

export interface CoreSystem {
    name:              string;
    active_name:       string;
    active_effect:     string;
    use?:              Use;
    activation:        Activation;
    active_synergies?: ActiveSynergyElement[];
    description?:      string;
    deactivation?:     Activation;
    integrated?:       string[];
    active_actions?:   Actiaction[];
    passive_name?:     string;
    passive_effect?:   string;
    passive_actions?:  PassiveActionElement[];
    deployables?:      CoreSystemDeployable[];
    active_bonuses?:   ActiveBonusElement[];
}

export interface ActiveBonusElement {
    id:            string;
    damage_types?: RangeTypeElement[];
    range_types?:  RangeTypeElement[];
    val:           number;
    weapon_types?: AllowedTypeElement[];
}

export interface CoreSystemDeployable {
    name:       string;
    type:       SystemTypeElement;
    detail:     string;
    activation: Activation;
    recall:     Activation;
    redeploy:   Activation;
    size:       number;
    hp:         string;
}

export enum SystemTypeElement {
    Deployable = "Deployable",
    Drone = "Drone",
    Mine = "Mine",
}

export interface PassiveActionElement {
    name:       string;
    activation: Activation;
    detail:     string;
    pilot?:     boolean;
}

export enum Use {
    Encounter = "Encounter",
    NextRound = "Next Round",
    NextTurn = "Next Turn",
}

export interface Counter {
    id:            string;
    name:          string;
    default_value: number;
    min:           number;
    max:           number;
    level?:        number;
}

export enum Mechtype {
    Artillery = "Artillery",
    Balanced = "Balanced",
    Controller = "Controller",
    Defender = "Defender",
    Striker = "Striker",
    Support = "Support",
}

export enum AllowedSizeElement {
    AuxAux = "Aux/Aux",
    Flex = "Flex",
    Heavy = "Heavy",
    Main = "Main",
    MainAux = "Main/Aux",
}

export interface OtherArt {
    tag: string;
    src: string;
}

export interface Trait {
    name:        string;
    description: string;
    use?:        string;
    bonuses?:    BonusElement[];
    synergies?:  TraitSynergy[];
    actions?:    Actiaction[];
}

export interface BonusElement {
    id:   string;
    val?: number;
}

export interface TraitSynergy {
    locations:     string[];
    detail:        string;
    weapon_types?: AllowedTypeElement[];
    weapon_sizes?: RestrictedSizeElement[];
    system_types?: SystemTypeElement[];
}

export enum RestrictedSizeElement {
    Any = "any",
    Auxiliary = "Auxiliary",
    Heavy = "Heavy",
    Main = "Main",
    ShipClass = "Ship-class",
    Superheavy = "Superheavy",
}

export interface Glossary {
    name:        string;
    description: string;
}

export interface Info {
    name:        string;
    author:      string;
    version:     string;
    description: string;
    website:     string;
    active:      boolean;
}

export interface Manufacturers {
    id:          Source;
    name:        string;
    logo:        string;
    light:       string;
    dark:        string;
    quote:       string;
    description: string;
}

export interface Mods {
    id:                string;
    name:              string;
    sp:                number;
    allowed_types:     AllowedTypeElement[];
    source:            Source;
    license:           string;
    license_level:     number;
    effect:            string;
    description:       string;
    tags?:             BonusElement[];
    license_id:        string;
    added_damage?:     AddedDamageElement[];
    restricted_sizes?: RestrictedSizeElement[];
    actions?:          PassiveActionElement[];
    added_range?:      AddedRange[];
    added_tags?:       AddedTagElement[];
}

export interface AddedDamageElement {
    type: RangeTypeElement;
    val:  string;
}

export interface AddedRange {
    type: RangeTypeElement;
    val:  number;
}

export interface AddedTagElement {
    id: string;
}

export interface PilotGear {
    id:           string;
    name:         string;
    type:         PilotGearType;
    description:  string;
    tags?:        BonusElement[];
    range?:       AddedRange[];
    damage?:      AddedRange[];
    effect?:      string;
    bonuses?:     PilotGearBonus[];
    actions?:     PilotGearAction[];
    deployables?: PilotGearDeployable[];
}

export interface PilotGearAction {
    name:       string;
    activation: Activation;
    detail:     string;
    pilot:      boolean;
    range?:     AddedRange[];
    damage?:    AddedRange[];
}

export interface PilotGearBonus {
    id:       string;
    val:      number;
    replace?: boolean;
}

export interface PilotGearDeployable {
    name:    string;
    type:    SystemTypeElement;
    detail:  string;
    pilot:   boolean;
    actions: PassiveActionElement[];
}

export enum PilotGearType {
    Armor = "Armor",
    Gear = "Gear",
    Weapon = "Weapon",
}

export interface Reserves {
    id:           string;
    name:         string;
    type:         ReserveType;
    label:        string;
    description:  string;
    bonuses?:     BonusElement[];
    deployables?: ReserveDeployable[];
    actions?:     ReserveAction[];
    synergies?:   ActiveSynergyElement[];
}

export interface ReserveAction {
    name:       string;
    activation: Activation;
    detail:     string;
    range?:     AddedRange[];
    damage?:    AddedDamageElement[];
}

export interface ReserveDeployable {
    name:   string;
    type:   SystemTypeElement;
    size:   number;
    detail: string;
}

export enum ReserveType {
    Bonus = "Bonus",
    Mech = "Mech",
    Resource = "Resource",
    Tactical = "Tactical",
}

export interface Rules {
    base_structure:         number;
    base_stress:            number;
    base_grapple:           number;
    base_ram:               number;
    base_pilot_hp:          number;
    base_pilot_evasion:     number;
    base_pilot_edef:        number;
    base_pilot_speed:       number;
    minimum_pilot_skills:   number;
    minimum_mech_skills:    number;
    minimum_pilot_talents:  number;
    trigger_bonus_per_rank: number;
    max_trigger_rank:       number;
    max_pilot_level:        number;
    max_pilot_weapons:      number;
    max_pilot_armor:        number;
    max_pilot_gear:         number;
    max_frame_size:         number;
    max_mech_armor:         number;
    max_hase:               number;
    mount_fittings:         MountFittings;
    overcharge:             string[];
    skill_headers:          SkillHeader[];
}

export interface MountFittings {
    Auxiliary: RestrictedSizeElement[];
    Main:      RestrictedSizeElement[];
    Flex:      RestrictedSizeElement[];
    Heavy:     RestrictedSizeElement[];
}

export interface SkillHeader {
    attr:        Family;
    description: string;
}

export enum Family {
    Cha = "cha",
    Custom = "Custom",
    Dex = "dex",
    Int = "int",
    Str = "str",
}

export interface Sitreps {
    id:           string;
    name:         string;
    pcVictory:    string;
    enemyVictory: string;
    description:  string;
    noVictory?:   string;
    controlZone?: string;
    deployment?:  string;
    extraction?:  string;
    objective?:   string;
}

export interface Skills {
    id:          string;
    name:        string;
    description: string;
    detail:      string;
    family:      Family;
}

export interface Statuses {
    name:       string;
    icon:       string;
    type:       StatusType;
    terse:      string;
    exclusive?: string;
    effects:    string;
}

export enum StatusType {
    Condition = "Condition",
    Status = "Status",
}

export interface Systems {
    id:            string;
    name:          string;
    sp:            number;
    source:        Source;
    license:       string;
    license_level: number;
    effect?:       string;
    description?:  string;
    tags?:         SystemTag[];
    license_id:    string;
    type?:         SystemType;
    actions?:      SystemAction[];
    deployables?:  SystemDeployable[];
    bonuses?:      ActiveBonusElement[];
    synergies?:    TraitSynergy[];
    counters?:     Counter[];
    talent_item?:  boolean;
    talent_id?:    string;
    talent_rank?:  number;
    ammo?:         Ammo[];
}

export interface SystemAction {
    name?:        string;
    activation?:  Activation;
    range?:       AddedRange[];
    detail:       string;
    damage?:      PurpleDamage[];
    tech_attack?: boolean;
    frequency?:   string;
    trigger?:     string;
    init?:        string;
    heat_cost?:   number;
}

export interface PurpleDamage {
    type: RangeTypeElement;
    val:  number | string;
}

export interface Ammo {
    name:          string;
    detail:        string;
    allowed_sizes: AllowedSizeElement[];
    allowed_types: AllowedType[];
    cost?:         number;
}

export enum AllowedType {
    Cannon = "cannon",
    Cqb = "cqb",
    Launcher = "launcher",
    Nexus = "nexus",
    Rifle = "rifle",
}

export interface SystemDeployable {
    name:          string;
    type:          SystemTypeElement;
    range?:        AddedRange[];
    detail:        string;
    instances?:    number;
    size?:         number;
    hp?:           number;
    evasion?:      number;
    recall?:       Activation;
    redeploy?:     Activation;
    activation?:   Activation;
    edef?:         number;
    actions?:      Actiaction[];
    cost?:         number;
    counters?:     Counter[];
    tags?:         AddedTagElement[];
    deactivation?: Activation;
}

export interface SystemTag {
    id:   string;
    val?: number | string;
}

export enum SystemType {
    AI = "AI",
    Deployable = "Deployable",
    Drone = "Drone",
    FlightSystem = "Flight System",
    Shield = "Shield",
    Tech = "Tech",
}

export interface Tables {
    pilot_names: any[];
    callsigns:   any[];
    mech_names:  any[];
    team_names:  any[];
    quirks:      string[];
}

export interface Tags {
    id:             string;
    name:           string;
    description:    string;
    filter_ignore?: boolean;
    hidden?:        boolean;
}

export interface Talents {
    id:          string;
    name:        string;
    icon:        string;
    terse:       string;
    description: string;
    ranks:       Rank[];
}

export interface Rank {
    name:               string;
    description:        string;
    synergies?:         TraitSynergy[];
    actions?:           Actiaction[];
    counters?:          Counter[];
    bonuses?:           BonusElement[];
    integrated?:        string[];
    exclusive?:         boolean;
    special_equipment?: string[];
}

export interface Weapons {
    id:             string;
    name:           string;
    mount:          RestrictedSizeElement;
    type:           AllowedTypeElement;
    damage?:        RangeElement[];
    range?:         RangeElement[];
    tags?:          SystemTag[];
    source?:        Source;
    license?:       string;
    license_level?: number;
    description?:   string;
    license_id:     string;
    on_crit?:       string;
    effect?:        string;
    profiles?:      Profile[];
    on_hit?:        string;
    on_attack?:     string;
    sp?:            number;
    no_attack?:     boolean;
    actions?:       Actiaction[];
    deployables?:   WeaponDeployable[];
    no_mods?:       boolean;
    no_core_bonus?: boolean;
    no_synergies?:  boolean;
    talent_item?:   boolean;
    talent_id?:     string;
    talent_rank?:   number;
    skirmish?:      boolean;
    barrage?:       boolean;
}

export interface RangeElement {
    type:      RangeTypeElement;
    val:       number | string;
    override?: boolean;
}

export interface WeaponDeployable {
    name:       string;
    type:       SystemTypeElement;
    activation: Activation;
    recall:     Activation;
    redeploy:   Activation;
    size:       number;
    hp:         number;
    armor:      number;
    edef:       number;
    evasion:    number;
    detail:     string;
}

export interface Profile {
    name:       string;
    damage:     FluffyDamage[];
    range:      RangeElement[];
    effect?:    string;
    actions?:   PassiveActionElement[];
    tags?:      BonusElement[];
    skirmish?:  boolean;
    on_attack?: string;
}

export interface FluffyDamage {
    type?:     RangeTypeElement;
    val:       string;
    override?: boolean;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toActions(json: string): Actions[] {
        return cast(JSON.parse(json), a(r("Actions")));
    }

    public static actionsToJson(value: Actions[]): string {
        return JSON.stringify(uncast(value, a(r("Actions"))), null, 2);
    }

    public static toBackgrounds(json: string): Environments[] {
        return cast(JSON.parse(json), a(r("Environments")));
    }

    public static backgroundsToJson(value: Environments[]): string {
        return JSON.stringify(uncast(value, a(r("Environments"))), null, 2);
    }

    public static toCoreBonuses(json: string): CoreBonuses[] {
        return cast(JSON.parse(json), a(r("CoreBonuses")));
    }

    public static coreBonusesToJson(value: CoreBonuses[]): string {
        return JSON.stringify(uncast(value, a(r("CoreBonuses"))), null, 2);
    }

    public static toEnvironments(json: string): Environments[] {
        return cast(JSON.parse(json), a(r("Environments")));
    }

    public static environmentsToJson(value: Environments[]): string {
        return JSON.stringify(uncast(value, a(r("Environments"))), null, 2);
    }

    public static toFactions(json: string): any[] {
        return cast(JSON.parse(json), a("any"));
    }

    public static factionsToJson(value: any[]): string {
        return JSON.stringify(uncast(value, a("any")), null, 2);
    }

    public static toFrames(json: string): Frames[] {
        return cast(JSON.parse(json), a(r("Frames")));
    }

    public static framesToJson(value: Frames[]): string {
        return JSON.stringify(uncast(value, a(r("Frames"))), null, 2);
    }

    public static toGlossary(json: string): Glossary[] {
        return cast(JSON.parse(json), a(r("Glossary")));
    }

    public static glossaryToJson(value: Glossary[]): string {
        return JSON.stringify(uncast(value, a(r("Glossary"))), null, 2);
    }

    public static toInfo(json: string): Info {
        return cast(JSON.parse(json), r("Info"));
    }

    public static infoToJson(value: Info): string {
        return JSON.stringify(uncast(value, r("Info")), null, 2);
    }

    public static toManufacturers(json: string): Manufacturers[] {
        return cast(JSON.parse(json), a(r("Manufacturers")));
    }

    public static manufacturersToJson(value: Manufacturers[]): string {
        return JSON.stringify(uncast(value, a(r("Manufacturers"))), null, 2);
    }

    public static toMods(json: string): Mods[] {
        return cast(JSON.parse(json), a(r("Mods")));
    }

    public static modsToJson(value: Mods[]): string {
        return JSON.stringify(uncast(value, a(r("Mods"))), null, 2);
    }

    public static toPilotGear(json: string): PilotGear[] {
        return cast(JSON.parse(json), a(r("PilotGear")));
    }

    public static pilotGearToJson(value: PilotGear[]): string {
        return JSON.stringify(uncast(value, a(r("PilotGear"))), null, 2);
    }

    public static toReserves(json: string): Reserves[] {
        return cast(JSON.parse(json), a(r("Reserves")));
    }

    public static reservesToJson(value: Reserves[]): string {
        return JSON.stringify(uncast(value, a(r("Reserves"))), null, 2);
    }

    public static toRules(json: string): Rules {
        return cast(JSON.parse(json), r("Rules"));
    }

    public static rulesToJson(value: Rules): string {
        return JSON.stringify(uncast(value, r("Rules")), null, 2);
    }

    public static toSitreps(json: string): Sitreps[] {
        return cast(JSON.parse(json), a(r("Sitreps")));
    }

    public static sitrepsToJson(value: Sitreps[]): string {
        return JSON.stringify(uncast(value, a(r("Sitreps"))), null, 2);
    }

    public static toSkills(json: string): Skills[] {
        return cast(JSON.parse(json), a(r("Skills")));
    }

    public static skillsToJson(value: Skills[]): string {
        return JSON.stringify(uncast(value, a(r("Skills"))), null, 2);
    }

    public static toStatuses(json: string): Statuses[] {
        return cast(JSON.parse(json), a(r("Statuses")));
    }

    public static statusesToJson(value: Statuses[]): string {
        return JSON.stringify(uncast(value, a(r("Statuses"))), null, 2);
    }

    public static toSystems(json: string): Systems[] {
        return cast(JSON.parse(json), a(r("Systems")));
    }

    public static systemsToJson(value: Systems[]): string {
        return JSON.stringify(uncast(value, a(r("Systems"))), null, 2);
    }

    public static toTables(json: string): Tables {
        return cast(JSON.parse(json), r("Tables"));
    }

    public static tablesToJson(value: Tables): string {
        return JSON.stringify(uncast(value, r("Tables")), null, 2);
    }

    public static toTags(json: string): Tags[] {
        return cast(JSON.parse(json), a(r("Tags")));
    }

    public static tagsToJson(value: Tags[]): string {
        return JSON.stringify(uncast(value, a(r("Tags"))), null, 2);
    }

    public static toTalents(json: string): Talents[] {
        return cast(JSON.parse(json), a(r("Talents")));
    }

    public static talentsToJson(value: Talents[]): string {
        return JSON.stringify(uncast(value, a(r("Talents"))), null, 2);
    }

    public static toWeapons(json: string): Weapons[] {
        return cast(JSON.parse(json), a(r("Weapons")));
    }

    public static weaponsToJson(value: Weapons[]): string {
        return JSON.stringify(uncast(value, a(r("Weapons"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Actions": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "activation", js: "activation", typ: r("Activation") },
        { json: "terse", js: "terse", typ: "" },
        { json: "detail", js: "detail", typ: "" },
        { json: "pilot", js: "pilot", typ: u(undefined, true) },
        { json: "mech", js: "mech", typ: u(undefined, true) },
        { json: "hide_active", js: "hide_active", typ: u(undefined, true) },
        { json: "synergy_locations", js: "synergy_locations", typ: u(undefined, a("")) },
        { json: "confirm", js: "confirm", typ: u(undefined, a("")) },
        { json: "ignore_used", js: "ignore_used", typ: u(undefined, true) },
    ], false),
    "Environments": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
    ], false),
    "CoreBonuses": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "source", js: "source", typ: r("Source") },
        { json: "effect", js: "effect", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "mounted_effect", js: "mounted_effect", typ: u(undefined, "") },
        { json: "bonuses", js: "bonuses", typ: u(undefined, a(r("CoreBonusBonus"))) },
        { json: "synergies", js: "synergies", typ: u(undefined, a(r("ActiveSynergyElement"))) },
        { json: "actions", js: "actions", typ: u(undefined, a(r("Actiaction"))) },
    ], false),
    "Actiaction": o([
        { json: "name", js: "name", typ: "" },
        { json: "activation", js: "activation", typ: r("Activation") },
        { json: "frequency", js: "frequency", typ: u(undefined, r("Frequency")) },
        { json: "trigger", js: "trigger", typ: u(undefined, "") },
        { json: "detail", js: "detail", typ: "" },
        { json: "init", js: "init", typ: u(undefined, "") },
        { json: "tech_attack", js: "tech_attack", typ: u(undefined, true) },
    ], false),
    "CoreBonusBonus": o([
        { json: "id", js: "id", typ: "" },
        { json: "val", js: "val", typ: u(a(""), true, 0) },
        { json: "weapon_types", js: "weapon_types", typ: u(undefined, a(r("AllowedTypeElement"))) },
        { json: "range_types", js: "range_types", typ: u(undefined, a(r("RangeTypeElement"))) },
    ], false),
    "ActiveSynergyElement": o([
        { json: "locations", js: "locations", typ: a("") },
        { json: "detail", js: "detail", typ: "" },
    ], false),
    "Frames": o([
        { json: "id", js: "id", typ: "" },
        { json: "license_level", js: "license_level", typ: 0 },
        { json: "source", js: "source", typ: r("Source") },
        { json: "name", js: "name", typ: "" },
        { json: "mechtype", js: "mechtype", typ: a(r("Mechtype")) },
        { json: "y_pos", js: "y_pos", typ: 3.14 },
        { json: "description", js: "description", typ: "" },
        { json: "mounts", js: "mounts", typ: a(r("AllowedSizeElement")) },
        { json: "stats", js: "stats", typ: m(3.14) },
        { json: "traits", js: "traits", typ: a(r("Trait")) },
        { json: "core_system", js: "core_system", typ: r("CoreSystem") },
        { json: "image_url", js: "image_url", typ: "" },
        { json: "license_id", js: "license_id", typ: "" },
        { json: "other_art", js: "other_art", typ: u(undefined, a(r("OtherArt"))) },
        { json: "data_type", js: "data_type", typ: u(undefined, "") },
        { json: "counters", js: "counters", typ: u(undefined, a(r("Counter"))) },
    ], false),
    "CoreSystem": o([
        { json: "name", js: "name", typ: "" },
        { json: "active_name", js: "active_name", typ: "" },
        { json: "active_effect", js: "active_effect", typ: "" },
        { json: "use", js: "use", typ: u(undefined, r("Use")) },
        { json: "activation", js: "activation", typ: r("Activation") },
        { json: "active_synergies", js: "active_synergies", typ: u(undefined, a(r("ActiveSynergyElement"))) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "deactivation", js: "deactivation", typ: u(undefined, r("Activation")) },
        { json: "integrated", js: "integrated", typ: u(undefined, a("")) },
        { json: "active_actions", js: "active_actions", typ: u(undefined, a(r("Actiaction"))) },
        { json: "passive_name", js: "passive_name", typ: u(undefined, "") },
        { json: "passive_effect", js: "passive_effect", typ: u(undefined, "") },
        { json: "passive_actions", js: "passive_actions", typ: u(undefined, a(r("PassiveActionElement"))) },
        { json: "deployables", js: "deployables", typ: u(undefined, a(r("CoreSystemDeployable"))) },
        { json: "active_bonuses", js: "active_bonuses", typ: u(undefined, a(r("ActiveBonusElement"))) },
    ], false),
    "ActiveBonusElement": o([
        { json: "id", js: "id", typ: "" },
        { json: "damage_types", js: "damage_types", typ: u(undefined, a(r("RangeTypeElement"))) },
        { json: "range_types", js: "range_types", typ: u(undefined, a(r("RangeTypeElement"))) },
        { json: "val", js: "val", typ: 0 },
        { json: "weapon_types", js: "weapon_types", typ: u(undefined, a(r("AllowedTypeElement"))) },
    ], false),
    "CoreSystemDeployable": o([
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("SystemTypeElement") },
        { json: "detail", js: "detail", typ: "" },
        { json: "activation", js: "activation", typ: r("Activation") },
        { json: "recall", js: "recall", typ: r("Activation") },
        { json: "redeploy", js: "redeploy", typ: r("Activation") },
        { json: "size", js: "size", typ: 3.14 },
        { json: "hp", js: "hp", typ: "" },
    ], false),
    "PassiveActionElement": o([
        { json: "name", js: "name", typ: "" },
        { json: "activation", js: "activation", typ: r("Activation") },
        { json: "detail", js: "detail", typ: "" },
        { json: "pilot", js: "pilot", typ: u(undefined, true) },
    ], false),
    "Counter": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "default_value", js: "default_value", typ: 0 },
        { json: "min", js: "min", typ: 0 },
        { json: "max", js: "max", typ: 0 },
        { json: "level", js: "level", typ: u(undefined, 0) },
    ], false),
    "OtherArt": o([
        { json: "tag", js: "tag", typ: "" },
        { json: "src", js: "src", typ: "" },
    ], false),
    "Trait": o([
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "use", js: "use", typ: u(undefined, "") },
        { json: "bonuses", js: "bonuses", typ: u(undefined, a(r("BonusElement"))) },
        { json: "synergies", js: "synergies", typ: u(undefined, a(r("TraitSynergy"))) },
        { json: "actions", js: "actions", typ: u(undefined, a(r("Actiaction"))) },
    ], false),
    "BonusElement": o([
        { json: "id", js: "id", typ: "" },
        { json: "val", js: "val", typ: u(undefined, 0) },
    ], false),
    "TraitSynergy": o([
        { json: "locations", js: "locations", typ: a("") },
        { json: "detail", js: "detail", typ: "" },
        { json: "weapon_types", js: "weapon_types", typ: u(undefined, a(r("AllowedTypeElement"))) },
        { json: "weapon_sizes", js: "weapon_sizes", typ: u(undefined, a(r("RestrictedSizeElement"))) },
        { json: "system_types", js: "system_types", typ: u(undefined, a(r("SystemTypeElement"))) },
    ], false),
    "Glossary": o([
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
    ], false),
    "Info": o([
        { json: "name", js: "name", typ: "" },
        { json: "author", js: "author", typ: "" },
        { json: "version", js: "version", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "website", js: "website", typ: "" },
        { json: "active", js: "active", typ: true },
    ], false),
    "Manufacturers": o([
        { json: "id", js: "id", typ: r("Source") },
        { json: "name", js: "name", typ: "" },
        { json: "logo", js: "logo", typ: "" },
        { json: "light", js: "light", typ: "" },
        { json: "dark", js: "dark", typ: "" },
        { json: "quote", js: "quote", typ: "" },
        { json: "description", js: "description", typ: "" },
    ], false),
    "Mods": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "sp", js: "sp", typ: 0 },
        { json: "allowed_types", js: "allowed_types", typ: a(r("AllowedTypeElement")) },
        { json: "source", js: "source", typ: r("Source") },
        { json: "license", js: "license", typ: "" },
        { json: "license_level", js: "license_level", typ: 0 },
        { json: "effect", js: "effect", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "tags", js: "tags", typ: u(undefined, a(r("BonusElement"))) },
        { json: "license_id", js: "license_id", typ: "" },
        { json: "added_damage", js: "added_damage", typ: u(undefined, a(r("AddedDamageElement"))) },
        { json: "restricted_sizes", js: "restricted_sizes", typ: u(undefined, a(r("RestrictedSizeElement"))) },
        { json: "actions", js: "actions", typ: u(undefined, a(r("PassiveActionElement"))) },
        { json: "added_range", js: "added_range", typ: u(undefined, a(r("AddedRange"))) },
        { json: "added_tags", js: "added_tags", typ: u(undefined, a(r("AddedTagElement"))) },
    ], false),
    "AddedDamageElement": o([
        { json: "type", js: "type", typ: r("RangeTypeElement") },
        { json: "val", js: "val", typ: "" },
    ], false),
    "AddedRange": o([
        { json: "type", js: "type", typ: r("RangeTypeElement") },
        { json: "val", js: "val", typ: 0 },
    ], false),
    "AddedTagElement": o([
        { json: "id", js: "id", typ: "" },
    ], false),
    "PilotGear": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("PilotGearType") },
        { json: "description", js: "description", typ: "" },
        { json: "tags", js: "tags", typ: u(undefined, a(r("BonusElement"))) },
        { json: "range", js: "range", typ: u(undefined, a(r("AddedRange"))) },
        { json: "damage", js: "damage", typ: u(undefined, a(r("AddedRange"))) },
        { json: "effect", js: "effect", typ: u(undefined, "") },
        { json: "bonuses", js: "bonuses", typ: u(undefined, a(r("PilotGearBonus"))) },
        { json: "actions", js: "actions", typ: u(undefined, a(r("PilotGearAction"))) },
        { json: "deployables", js: "deployables", typ: u(undefined, a(r("PilotGearDeployable"))) },
    ], false),
    "PilotGearAction": o([
        { json: "name", js: "name", typ: "" },
        { json: "activation", js: "activation", typ: r("Activation") },
        { json: "detail", js: "detail", typ: "" },
        { json: "pilot", js: "pilot", typ: true },
        { json: "range", js: "range", typ: u(undefined, a(r("AddedRange"))) },
        { json: "damage", js: "damage", typ: u(undefined, a(r("AddedRange"))) },
    ], false),
    "PilotGearBonus": o([
        { json: "id", js: "id", typ: "" },
        { json: "val", js: "val", typ: 0 },
        { json: "replace", js: "replace", typ: u(undefined, true) },
    ], false),
    "PilotGearDeployable": o([
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("SystemTypeElement") },
        { json: "detail", js: "detail", typ: "" },
        { json: "pilot", js: "pilot", typ: true },
        { json: "actions", js: "actions", typ: a(r("PassiveActionElement")) },
    ], false),
    "Reserves": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("ReserveType") },
        { json: "label", js: "label", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "bonuses", js: "bonuses", typ: u(undefined, a(r("BonusElement"))) },
        { json: "deployables", js: "deployables", typ: u(undefined, a(r("ReserveDeployable"))) },
        { json: "actions", js: "actions", typ: u(undefined, a(r("ReserveAction"))) },
        { json: "synergies", js: "synergies", typ: u(undefined, a(r("ActiveSynergyElement"))) },
    ], false),
    "ReserveAction": o([
        { json: "name", js: "name", typ: "" },
        { json: "activation", js: "activation", typ: r("Activation") },
        { json: "detail", js: "detail", typ: "" },
        { json: "range", js: "range", typ: u(undefined, a(r("AddedRange"))) },
        { json: "damage", js: "damage", typ: u(undefined, a(r("AddedDamageElement"))) },
    ], false),
    "ReserveDeployable": o([
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("SystemTypeElement") },
        { json: "size", js: "size", typ: 0 },
        { json: "detail", js: "detail", typ: "" },
    ], false),
    "Rules": o([
        { json: "base_structure", js: "base_structure", typ: 0 },
        { json: "base_stress", js: "base_stress", typ: 0 },
        { json: "base_grapple", js: "base_grapple", typ: 0 },
        { json: "base_ram", js: "base_ram", typ: 0 },
        { json: "base_pilot_hp", js: "base_pilot_hp", typ: 0 },
        { json: "base_pilot_evasion", js: "base_pilot_evasion", typ: 0 },
        { json: "base_pilot_edef", js: "base_pilot_edef", typ: 0 },
        { json: "base_pilot_speed", js: "base_pilot_speed", typ: 0 },
        { json: "minimum_pilot_skills", js: "minimum_pilot_skills", typ: 0 },
        { json: "minimum_mech_skills", js: "minimum_mech_skills", typ: 0 },
        { json: "minimum_pilot_talents", js: "minimum_pilot_talents", typ: 0 },
        { json: "trigger_bonus_per_rank", js: "trigger_bonus_per_rank", typ: 0 },
        { json: "max_trigger_rank", js: "max_trigger_rank", typ: 0 },
        { json: "max_pilot_level", js: "max_pilot_level", typ: 0 },
        { json: "max_pilot_weapons", js: "max_pilot_weapons", typ: 0 },
        { json: "max_pilot_armor", js: "max_pilot_armor", typ: 0 },
        { json: "max_pilot_gear", js: "max_pilot_gear", typ: 0 },
        { json: "max_frame_size", js: "max_frame_size", typ: 0 },
        { json: "max_mech_armor", js: "max_mech_armor", typ: 0 },
        { json: "max_hase", js: "max_hase", typ: 0 },
        { json: "mount_fittings", js: "mount_fittings", typ: r("MountFittings") },
        { json: "overcharge", js: "overcharge", typ: a("") },
        { json: "skill_headers", js: "skill_headers", typ: a(r("SkillHeader")) },
    ], false),
    "MountFittings": o([
        { json: "Auxiliary", js: "Auxiliary", typ: a(r("RestrictedSizeElement")) },
        { json: "Main", js: "Main", typ: a(r("RestrictedSizeElement")) },
        { json: "Flex", js: "Flex", typ: a(r("RestrictedSizeElement")) },
        { json: "Heavy", js: "Heavy", typ: a(r("RestrictedSizeElement")) },
    ], false),
    "SkillHeader": o([
        { json: "attr", js: "attr", typ: r("Family") },
        { json: "description", js: "description", typ: "" },
    ], false),
    "Sitreps": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "pcVictory", js: "pcVictory", typ: "" },
        { json: "enemyVictory", js: "enemyVictory", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "noVictory", js: "noVictory", typ: u(undefined, "") },
        { json: "controlZone", js: "controlZone", typ: u(undefined, "") },
        { json: "deployment", js: "deployment", typ: u(undefined, "") },
        { json: "extraction", js: "extraction", typ: u(undefined, "") },
        { json: "objective", js: "objective", typ: u(undefined, "") },
    ], false),
    "Skills": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "detail", js: "detail", typ: "" },
        { json: "family", js: "family", typ: r("Family") },
    ], false),
    "Statuses": o([
        { json: "name", js: "name", typ: "" },
        { json: "icon", js: "icon", typ: "" },
        { json: "type", js: "type", typ: r("StatusType") },
        { json: "terse", js: "terse", typ: "" },
        { json: "exclusive", js: "exclusive", typ: u(undefined, "") },
        { json: "effects", js: "effects", typ: "" },
    ], false),
    "Systems": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "sp", js: "sp", typ: 0 },
        { json: "source", js: "source", typ: r("Source") },
        { json: "license", js: "license", typ: "" },
        { json: "license_level", js: "license_level", typ: 0 },
        { json: "effect", js: "effect", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "tags", js: "tags", typ: u(undefined, a(r("SystemTag"))) },
        { json: "license_id", js: "license_id", typ: "" },
        { json: "type", js: "type", typ: u(undefined, r("SystemType")) },
        { json: "actions", js: "actions", typ: u(undefined, a(r("SystemAction"))) },
        { json: "deployables", js: "deployables", typ: u(undefined, a(r("SystemDeployable"))) },
        { json: "bonuses", js: "bonuses", typ: u(undefined, a(r("ActiveBonusElement"))) },
        { json: "synergies", js: "synergies", typ: u(undefined, a(r("TraitSynergy"))) },
        { json: "counters", js: "counters", typ: u(undefined, a(r("Counter"))) },
        { json: "talent_item", js: "talent_item", typ: u(undefined, true) },
        { json: "talent_id", js: "talent_id", typ: u(undefined, "") },
        { json: "talent_rank", js: "talent_rank", typ: u(undefined, 0) },
        { json: "ammo", js: "ammo", typ: u(undefined, a(r("Ammo"))) },
    ], false),
    "SystemAction": o([
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "activation", js: "activation", typ: u(undefined, r("Activation")) },
        { json: "range", js: "range", typ: u(undefined, a(r("AddedRange"))) },
        { json: "detail", js: "detail", typ: "" },
        { json: "damage", js: "damage", typ: u(undefined, a(r("PurpleDamage"))) },
        { json: "tech_attack", js: "tech_attack", typ: u(undefined, true) },
        { json: "frequency", js: "frequency", typ: u(undefined, "") },
        { json: "trigger", js: "trigger", typ: u(undefined, "") },
        { json: "init", js: "init", typ: u(undefined, "") },
        { json: "heat_cost", js: "heat_cost", typ: u(undefined, 0) },
    ], false),
    "PurpleDamage": o([
        { json: "type", js: "type", typ: r("RangeTypeElement") },
        { json: "val", js: "val", typ: u(0, "") },
    ], false),
    "Ammo": o([
        { json: "name", js: "name", typ: "" },
        { json: "detail", js: "detail", typ: "" },
        { json: "allowed_sizes", js: "allowed_sizes", typ: a(r("AllowedSizeElement")) },
        { json: "allowed_types", js: "allowed_types", typ: a(r("AllowedType")) },
        { json: "cost", js: "cost", typ: u(undefined, 0) },
    ], false),
    "SystemDeployable": o([
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("SystemTypeElement") },
        { json: "range", js: "range", typ: u(undefined, a(r("AddedRange"))) },
        { json: "detail", js: "detail", typ: "" },
        { json: "instances", js: "instances", typ: u(undefined, 0) },
        { json: "size", js: "size", typ: u(undefined, 3.14) },
        { json: "hp", js: "hp", typ: u(undefined, 0) },
        { json: "evasion", js: "evasion", typ: u(undefined, 0) },
        { json: "recall", js: "recall", typ: u(undefined, r("Activation")) },
        { json: "redeploy", js: "redeploy", typ: u(undefined, r("Activation")) },
        { json: "activation", js: "activation", typ: u(undefined, r("Activation")) },
        { json: "edef", js: "edef", typ: u(undefined, 0) },
        { json: "actions", js: "actions", typ: u(undefined, a(r("Actiaction"))) },
        { json: "cost", js: "cost", typ: u(undefined, 0) },
        { json: "counters", js: "counters", typ: u(undefined, a(r("Counter"))) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("AddedTagElement"))) },
        { json: "deactivation", js: "deactivation", typ: u(undefined, r("Activation")) },
    ], false),
    "SystemTag": o([
        { json: "id", js: "id", typ: "" },
        { json: "val", js: "val", typ: u(undefined, u(0, "")) },
    ], false),
    "Tables": o([
        { json: "pilot_names", js: "pilot_names", typ: a("any") },
        { json: "callsigns", js: "callsigns", typ: a("any") },
        { json: "mech_names", js: "mech_names", typ: a("any") },
        { json: "team_names", js: "team_names", typ: a("any") },
        { json: "quirks", js: "quirks", typ: a("") },
    ], false),
    "Tags": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "filter_ignore", js: "filter_ignore", typ: u(undefined, true) },
        { json: "hidden", js: "hidden", typ: u(undefined, true) },
    ], false),
    "Talents": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "icon", js: "icon", typ: "" },
        { json: "terse", js: "terse", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "ranks", js: "ranks", typ: a(r("Rank")) },
    ], false),
    "Rank": o([
        { json: "name", js: "name", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "synergies", js: "synergies", typ: u(undefined, a(r("TraitSynergy"))) },
        { json: "actions", js: "actions", typ: u(undefined, a(r("Actiaction"))) },
        { json: "counters", js: "counters", typ: u(undefined, a(r("Counter"))) },
        { json: "bonuses", js: "bonuses", typ: u(undefined, a(r("BonusElement"))) },
        { json: "integrated", js: "integrated", typ: u(undefined, a("")) },
        { json: "exclusive", js: "exclusive", typ: u(undefined, true) },
        { json: "special_equipment", js: "special_equipment", typ: u(undefined, a("")) },
    ], false),
    "Weapons": o([
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "mount", js: "mount", typ: r("RestrictedSizeElement") },
        { json: "type", js: "type", typ: r("AllowedTypeElement") },
        { json: "damage", js: "damage", typ: u(undefined, a(r("RangeElement"))) },
        { json: "range", js: "range", typ: u(undefined, a(r("RangeElement"))) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("SystemTag"))) },
        { json: "source", js: "source", typ: u(undefined, r("Source")) },
        { json: "license", js: "license", typ: u(undefined, "") },
        { json: "license_level", js: "license_level", typ: u(undefined, 0) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "license_id", js: "license_id", typ: "" },
        { json: "on_crit", js: "on_crit", typ: u(undefined, "") },
        { json: "effect", js: "effect", typ: u(undefined, "") },
        { json: "profiles", js: "profiles", typ: u(undefined, a(r("Profile"))) },
        { json: "on_hit", js: "on_hit", typ: u(undefined, "") },
        { json: "on_attack", js: "on_attack", typ: u(undefined, "") },
        { json: "sp", js: "sp", typ: u(undefined, 0) },
        { json: "no_attack", js: "no_attack", typ: u(undefined, true) },
        { json: "actions", js: "actions", typ: u(undefined, a(r("Actiaction"))) },
        { json: "deployables", js: "deployables", typ: u(undefined, a(r("WeaponDeployable"))) },
        { json: "no_mods", js: "no_mods", typ: u(undefined, true) },
        { json: "no_core_bonus", js: "no_core_bonus", typ: u(undefined, true) },
        { json: "no_synergies", js: "no_synergies", typ: u(undefined, true) },
        { json: "talent_item", js: "talent_item", typ: u(undefined, true) },
        { json: "talent_id", js: "talent_id", typ: u(undefined, "") },
        { json: "talent_rank", js: "talent_rank", typ: u(undefined, 0) },
        { json: "skirmish", js: "skirmish", typ: u(undefined, true) },
        { json: "barrage", js: "barrage", typ: u(undefined, true) },
    ], false),
    "RangeElement": o([
        { json: "type", js: "type", typ: r("RangeTypeElement") },
        { json: "val", js: "val", typ: u(0, "") },
        { json: "override", js: "override", typ: u(undefined, true) },
    ], false),
    "WeaponDeployable": o([
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("SystemTypeElement") },
        { json: "activation", js: "activation", typ: r("Activation") },
        { json: "recall", js: "recall", typ: r("Activation") },
        { json: "redeploy", js: "redeploy", typ: r("Activation") },
        { json: "size", js: "size", typ: 3.14 },
        { json: "hp", js: "hp", typ: 0 },
        { json: "armor", js: "armor", typ: 0 },
        { json: "edef", js: "edef", typ: 0 },
        { json: "evasion", js: "evasion", typ: 0 },
        { json: "detail", js: "detail", typ: "" },
    ], false),
    "Profile": o([
        { json: "name", js: "name", typ: "" },
        { json: "damage", js: "damage", typ: a(r("FluffyDamage")) },
        { json: "range", js: "range", typ: a(r("RangeElement")) },
        { json: "effect", js: "effect", typ: u(undefined, "") },
        { json: "actions", js: "actions", typ: u(undefined, a(r("PassiveActionElement"))) },
        { json: "tags", js: "tags", typ: u(undefined, a(r("BonusElement"))) },
        { json: "skirmish", js: "skirmish", typ: u(undefined, true) },
        { json: "on_attack", js: "on_attack", typ: u(undefined, "") },
    ], false),
    "FluffyDamage": o([
        { json: "type", js: "type", typ: u(undefined, r("RangeTypeElement")) },
        { json: "val", js: "val", typ: "" },
        { json: "override", js: "override", typ: u(undefined, true) },
    ], false),
    "Activation": [
        "Downtime",
        "Free",
        "Full",
        "Full Tech",
        "Invade",
        "Move",
        "Protocol",
        "Quick",
        "Quick Tech",
        "Reaction",
    ],
    "Frequency": [
        "1/round",
        "Unlimited",
    ],
    "RangeTypeElement": [
        "Blast",
        "Burn",
        "Burst",
        "Cone",
        "Energy",
        "Explosive",
        "Heat",
        "Kinetic",
        "Line",
        "Range",
        "Threat",
        "kinetic",
        "variable",
        "Variable",
    ],
    "AllowedTypeElement": [
        "any",
        "Cannon",
        "CQB",
        "???",
        "Launcher",
        "Melee",
        "Nexus",
        "Ranged",
        "Rifle",
        "Special",
        "Spool Weapon",
    ],
    "Source": [
        "",
        "GMS",
        "HA",
        "HORUS",
        "IPS-N",
        "SSC",
    ],
    "SystemTypeElement": [
        "Deployable",
        "Drone",
        "Mine",
    ],
    "Use": [
        "Encounter",
        "Next Round",
        "Next Turn",
    ],
    "Mechtype": [
        "Artillery",
        "Balanced",
        "Controller",
        "Defender",
        "Striker",
        "Support",
    ],
    "AllowedSizeElement": [
        "Aux/Aux",
        "Flex",
        "Heavy",
        "Main",
        "Main/Aux",
    ],
    "RestrictedSizeElement": [
        "any",
        "Auxiliary",
        "Heavy",
        "Main",
        "Ship-class",
        "Superheavy",
    ],
    "PilotGearType": [
        "Armor",
        "Gear",
        "Weapon",
    ],
    "ReserveType": [
        "Bonus",
        "Mech",
        "Resource",
        "Tactical",
    ],
    "Family": [
        "cha",
        "Custom",
        "dex",
        "int",
        "str",
    ],
    "StatusType": [
        "Condition",
        "Status",
    ],
    "AllowedType": [
        "cannon",
        "cqb",
        "launcher",
        "nexus",
        "rifle",
    ],
    "SystemType": [
        "AI",
        "Deployable",
        "Drone",
        "Flight System",
        "Shield",
        "Tech",
    ],
};
