export interface MapInfo {
  status: number;
  data: Data;
}
export interface Data {
  uuid: string;
  displayName: string;
  narrativeDescription?: null;
  tacticalDescription: string;
  coordinates: string;
  displayIcon: string;
  listViewIcon: string;
  listViewIconTall: string;
  splash: string;
  stylizedBackgroundImage: string;
  premierBackgroundImage: string;
  assetPath: string;
  mapUrl: string;
  xMultiplier: number;
  yMultiplier: number;
  xScalarToAdd: number;
  yScalarToAdd: number;
  callouts?: CalloutsEntity[] | null;
}
export interface CalloutsEntity {
  regionName: string;
  superRegionName: string;
  location: Location;
}
export interface Location {
  x: number;
  y: number;
}
