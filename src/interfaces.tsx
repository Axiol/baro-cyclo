import { LatLngTuple } from "leaflet";

export interface MapProps {
  position: LatLngTuple;
  boundaries: LatLngTuple[];
  places: any[];
  showAllPlaces: boolean;
}

export interface RateBarProps {
  big?: boolean | undefined;
}

export interface GeocodingSuggestion {
  _id: string;
  name: string;
  center: LatLngTuple;
  borders: LatLngTuple[];
}

export interface SearchProps {
  onCitySelect(center: LatLngTuple, polygon: LatLngTuple[]): void,
}