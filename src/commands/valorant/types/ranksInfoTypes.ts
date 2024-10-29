export interface RanksInfo {
  status: number;
  data?: RanksInfoDataEntity[] | null;
}
export interface RanksInfoDataEntity {
  uuid: string;
  assetObjectName: string;
  tiers?: TiersEntity[] | null;
  assetPath: string;
}
export interface TiersEntity {
  tier: number;
  tierName: string;
  division: string;
  divisionName: string;
  color: string;
  backgroundColor: string;
  smallIcon?: string | null;
  largeIcon?: string | null;
  rankTriangleDownIcon?: string | null;
  rankTriangleUpIcon?: string | null;
}
