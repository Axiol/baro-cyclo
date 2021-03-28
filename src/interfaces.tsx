import { LatLngTuple } from "leaflet";

export interface MapProps {
  position: LatLngTuple;
  boundaries: LatLngTuple[];
}

export interface GeocodingSuggestion {
  id: string;
  name: string;
  center: LatLngTuple;
}

export interface SearchProps {
  onCitySelect(center: LatLngTuple, polygon: LatLngTuple[]): void,
}