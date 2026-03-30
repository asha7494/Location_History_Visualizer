import type { LocationPoint } from "../types/types";

export function processLocations(locations: LocationPoint[]) {

  locations.forEach((loc) => {
    console.log(loc.lat, loc.lon, loc.time);
  });

}