export interface GamemodeInfo {
  status: number;
  data?: DataEntity[] | null;
}
export interface DataEntity {
  uuid: string;
  displayName: string;
  description?: string | null;
  duration?: string | null;
  economyType?: string | null;
  allowsMatchTimeouts: boolean;
  isTeamVoiceAllowed: boolean;
  isMinimapHidden: boolean;
  orbCount: number;
  roundsPerHalf: number;
  teamRoles?: string[] | null;
  gameFeatureOverrides?: GameFeatureOverridesEntity[] | null;
  gameRuleBoolOverrides?: GameRuleBoolOverridesEntity[] | null;
  displayIcon?: string | null;
  listViewIconTall?: string | null;
  assetPath: string;
}
export interface GameFeatureOverridesEntity {
  featureName: string;
  state: boolean;
}
export interface GameRuleBoolOverridesEntity {
  ruleName: string;
  state: boolean;
}
