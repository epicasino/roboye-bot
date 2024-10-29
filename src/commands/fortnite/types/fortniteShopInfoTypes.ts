export interface FortniteShopInfo {
  result: boolean;
  fullShop: boolean;
  lastUpdate: LastUpdate;
  nextRotation?: null;
  carousel?: null;
  specialOfferVideo?: null;
  customBackground?: null;
  shop?: ShopEntity[] | null;
}
export interface LastUpdate {
  date: string;
  uid: string;
}

export interface ShopEntity {
  mainId: string;
  displayName: string;
  displayDescription: string;
  displayType: string;
  mainType: string;
  offerId: string;
  devName: string;
  offerDates: OfferDates;
  colors: Colors;
  displayAssets?: DisplayAssetsEntity[] | null;
  firstReleaseDate: string;
  previousReleaseDate?: string | null;
  giftAllowed: boolean;
  buyAllowed: boolean;
  price: Price;
  rarity: TypeOrRarityOrSeries;
  series?: TypeOrRarityOrSeries1 | null;
  banner?: Banner | null;
  offerTag?: OfferTag | null;
  granted?: GrantedEntity[] | null;
  priority: number;
  section: Section;
  groupIndex: number;
  storeName: string;
  tileSize: string;
  categories?: null[] | null;
}
export interface OfferDates {
  in?: string | null;
  out: string;
}
export interface Colors {
  color1?: string | null;
  color2?: string | null;
  color3?: string | null;
  textBackgroundColor?: string | null;
}
export interface DisplayAssetsEntity {
  displayAsset?: string | null;
  materialInstance?: string | null;
  primaryMode: string;
  productTag: string;
  url: string;
  flipbook?: null;
  background_texture?: string | null;
  background?: string | null;
  full_background?: string | null;
}
export interface Price {
  regularPrice: number;
  finalPrice: number;
  floorPrice: number;
}
export interface TypeOrRarityOrSeries {
  id: string;
  name: string;
}
export interface TypeOrRarityOrSeries1 {
  id: string;
  name: string;
}
export interface Banner {
  id: string;
  name: string;
  intensity: string;
}
export interface OfferTag {
  id: string;
  text: string;
}
export interface GrantedEntity {
  id: string;
  type: TypeOrRarityOrSeries;
  name: string;
  description: string;
  rarity: TypeOrRarityOrSeries;
  series?: TypeOrRarityOrSeries2 | null;
  images: Images;
  juno: JunoOrBeans;
  beans: JunoOrBeans;
  video?: null;
  audio?: null;
  gameplayTags?: (string | null)[] | null;
  set?: Set | null;
}
export interface TypeOrRarityOrSeries2 {
  id: string;
  name: string;
}
export interface Images {
  icon?: string | null;
  featured?: string | null;
  background?: string | null;
  icon_background?: string | null;
  full_background?: string | null;
}
export interface JunoOrBeans {
  icon?: string | null;
}
export interface Set {
  id: string;
  name: string;
  partOf: string;
}
export interface Section {
  id: string;
  name: string;
  category?: string | null;
  landingPriority: number;
  metadata?: Metadata | null;
}
export interface Metadata {
  textureMetadata?: TextureMetadataEntityOrTextMetadataEntity[] | null;
  textMetadata?: TextureMetadataEntityOrTextMetadataEntity[] | null;
  stringMetadata?: StringMetadataEntity[] | null;
}
export interface TextureMetadataEntityOrTextMetadataEntity {
  key: string;
  value: string;
}
export interface StringMetadataEntity {
  key: string;
  value: string | boolean | string | boolean;
}
