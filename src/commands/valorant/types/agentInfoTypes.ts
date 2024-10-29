export interface AgentInfo {
  status: number;
  data: Data;
}
export interface Data {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  characterTags?: string[] | null;
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  background: string;
  backgroundGradientColors?: string[] | null;
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: Role;
  recruitmentData?: null;
  abilities?: AbilitiesEntity[] | null;
  voiceLine?: null;
}
export interface Role {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  assetPath: string;
}
export interface AbilitiesEntity {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
}
