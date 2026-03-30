import type { LocationPoint } from "../types/types";
import { point } from "@turf/helpers";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import type { GeoJSONFeatureCollection } from "../types/types";
import countriesData from "../assets/countries.json";

const countries = countriesData as GeoJSONFeatureCollection;

function getCountryByCoordinates(lat: number, lon: number): string | null {
  const pt = point([lon, lat]); // Turf uses [lon, lat]
  for (const country of countries.features) {
    if (booleanPointInPolygon(pt, country as any)) {
      return (country as any).properties.name;
    }
  }
  return null;
}

export function processLocations(locations: LocationPoint[]) {
  const countryCounts: Record<string, number> = {};

  // Cross-reference coordinates and count locations per country
  locations.forEach((location) => {
    const country = getCountryByCoordinates(location.lat, location.lon) || "Unknown";
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  // Calculate total locations
  const totalLocations = locations.length;

  // Calculate percentage of visits per country
  const countryPercentages = Object.entries(countryCounts).map(([country, count]) => ({
    country,
    percentage: ((count / totalLocations) * 100).toFixed(2),
  }));

  // Sort by percentage in descending order
  countryPercentages.sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));

  return countryPercentages;
}