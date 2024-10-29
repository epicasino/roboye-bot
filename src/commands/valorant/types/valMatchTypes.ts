export interface ValorantMatch {
  status: number;
  data?: ValorantMatchDataEntity[] | null;
}
export interface ValorantMatchDataEntity {
  metadata: Metadata;
  players?: PlayersEntity[] | null;
  observers?: null[] | null;
  coaches?: null[] | null;
  teams?: TeamsEntity[] | null;
  rounds?: RoundsEntity[] | null;
  kills?: KillsEntity[] | null;
}
export interface Metadata {
  match_id: string;
  map: MapOrAgentOrArmor;
  game_version: string;
  game_length_in_ms: number;
  started_at: string;
  is_completed: boolean;
  queue: Queue;
  season: Season;
  platform: string;
  premier?: null;
  party_rr_penaltys?: PartyRrPenaltysEntity[] | null;
  region: string;
  cluster: string;
}
export interface MapOrAgentOrArmor {
  id: string;
  name: string;
}
export interface Queue {
  id: string;
  name: string;
  mode_type: string;
}
export interface Season {
  id: string;
  short: string;
}
export interface PartyRrPenaltysEntity {
  party_id: string;
  penalty: number;
}
export interface PlayersEntity {
  puuid: string;
  name: string;
  tag: string;
  team_id: string;
  platform: string;
  party_id: string;
  agent: MapOrAgentOrArmor;
  stats: Stats;
  ability_casts: AbilityCasts;
  tier: Tier;
  customization: Customization;
  account_level: number;
  session_playtime_in_ms: number;
  behavior: Behavior;
  economy: Economy;
}
export interface Stats {
  score: number;
  kills: number;
  deaths: number;
  assists: number;
  headshots: number;
  bodyshots: number;
  legshots: number;
  damage: Damage;
}
export interface Damage {
  dealt: number;
  received: number;
}
export interface AbilityCasts {
  grenade: number;
  ability1: number;
  ability2: number;
  ultimate: number;
}
export interface Tier {
  id: number;
  name: string;
}
export interface Customization {
  card: string;
  title: string;
  preferred_level_border?: string | null;
}
export interface Behavior {
  afk_rounds: number;
  friendly_fire: FriendlyFire;
  rounds_in_spawn: number;
}
export interface FriendlyFire {
  incoming: number;
  outgoing: number;
}
export interface Economy {
  spent: SpentOrLoadoutValue;
  loadout_value: SpentOrLoadoutValue;
}
export interface SpentOrLoadoutValue {
  overall: number;
  average: number;
}
export interface TeamsEntity {
  team_id: string;
  rounds: Rounds;
  won: boolean;
  premier_roster?: null;
}
export interface Rounds {
  won: number;
  lost: number;
}
export interface RoundsEntity {
  id: number;
  result: string;
  ceremony: string;
  winning_team: string;
  plant?: Plant | null;
  defuse?: Defuse | null;
  stats?: StatsEntity[] | null;
}
export interface Plant {
  round_time_in_ms: number;
  site: string;
  location: Location;
  player: PlayerOrKillerOrVictimOrAssistantsEntity;
  player_locations?: PlayerLocationsEntity[] | null;
}
export interface Location {
  x: number;
  y: number;
}
export interface PlayerOrKillerOrVictimOrAssistantsEntity {
  puuid: string;
  name: string;
  tag: string;
  team: string;
}
export interface PlayerLocationsEntity {
  player: PlayerOrKillerOrVictimOrAssistantsEntity;
  view_radians: number;
  location: Location;
}
export interface Defuse {
  round_time_in_ms: number;
  location: Location;
  player: PlayerOrKillerOrVictimOrAssistantsEntity;
  player_locations?: PlayerLocationsEntity[] | null;
}
export interface StatsEntity {
  player: PlayerOrKillerOrVictimOrAssistantsEntity;
  ability_casts: AbilityCasts1;
  damage_events?: (DamageEventsEntity | null)[] | null;
  stats: Stats1;
  economy: Economy1;
  was_afk: boolean;
  received_penalty: boolean;
  stayed_in_spawn: boolean;
}
export interface AbilityCasts1 {
  grenade?: null;
  ability_1?: null;
  ability_2?: null;
  ultimate?: null;
}
export interface DamageEventsEntity {
  player: PlayerOrKillerOrVictimOrAssistantsEntity;
  bodyshots: number;
  headshots: number;
  legshots: number;
  damage: number;
}
export interface Stats1 {
  score: number;
  kills: number;
  headshots: number;
  bodyshots: number;
  legshots: number;
}
export interface Economy1 {
  loadout_value: number;
  remaining: number;
  weapon?: Weapon | null;
  armor?: MapOrAgentOrArmor1 | null;
}
export interface Weapon {
  id: string;
  name: string;
  type: string;
}
export interface MapOrAgentOrArmor1 {
  id: string;
  name: string;
}
export interface KillsEntity {
  time_in_round_in_ms: number;
  time_in_match_in_ms: number;
  round: number;
  killer: PlayerOrKillerOrVictimOrAssistantsEntity;
  victim: PlayerOrKillerOrVictimOrAssistantsEntity;
  assistants?: (PlayerOrKillerOrVictimOrAssistantsEntity1 | null)[] | null;
  location: Location;
  weapon: Weapon1;
  secondary_fire_mode: boolean;
  player_locations?: (PlayerLocationsEntity1 | null)[] | null;
}
export interface PlayerOrKillerOrVictimOrAssistantsEntity1 {
  puuid: string;
  name: string;
  tag: string;
  team: string;
}
export interface Weapon1 {
  id: string;
  name?: string | null;
  type: string;
}
export interface PlayerLocationsEntity1 {
  player: PlayerOrKillerOrVictimOrAssistantsEntity;
  view_radians: number;
  location: Location;
}
