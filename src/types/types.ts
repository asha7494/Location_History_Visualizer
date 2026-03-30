export type LocationPoint = {
  lat: number
  lon: number
  time: string
}

export type GeoJSONFeature = {
  type: "Feature";
  properties: {
    name: string;
    [key: string]: any;
  };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][]; // polygons only
  };
};

export type GeoJSONFeatureCollection = {
  type: "FeatureCollection";
  features: GeoJSONFeature[];
};