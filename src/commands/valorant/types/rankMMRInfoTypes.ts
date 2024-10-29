export interface RankMMRInfo {
  status: number;
  data: RankMMRData;
  errors?: { status: number }[];
}
export interface RankMMRData {
  account: Account;
  peak: Peak;
  current: Current;
  seasonal?: SeasonalEntity[] | null;
}
export interface Account {
  name: string;
  tag: string;
  puuid: string;
}
export interface Peak {
  season: Season;
  ranking_schema: string;
  tier: TierOrActWinsEntityOrEndTier;
}
export interface Season {
  id: string;
  short: string;
}
export interface TierOrActWinsEntityOrEndTier {
  id: number;
  name: string;
}
export interface Current {
  tier: TierOrActWinsEntityOrEndTier;
  rr: number;
  last_change: number;
  elo: number;
  games_needed_for_rating: number;
  leaderboard_placement?: null;
}
export interface SeasonalEntity {
  season: Season;
  wins: number;
  games: number;
  end_tier: TierOrActWinsEntityOrEndTier;
  ranking_schema: string;
  leaderboard_placement?: null;
  act_wins?: TierOrActWinsEntityOrEndTier[] | null;
}
