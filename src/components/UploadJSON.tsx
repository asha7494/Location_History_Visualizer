import { useState } from "react";
import type { LocationPoint } from "../types/types";

type Props = {
  onLocationsLoaded: (locations: LocationPoint[]) => void;
};

function FileUpload({ onLocationsLoaded }: Props) {

  function parsePoint(point: string) {
    const [lat, lon] = point
      .replace(/°/g, "")
      .split(",")
      .map(v => parseFloat(v.trim()));

    return { lat, lon };
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const json = JSON.parse(e.target?.result as string);

      const extracted: LocationPoint[] = [];

      json.semanticSegments.forEach((segment: any) => {
        segment.timelinePath?.forEach((p: any) => {
          const coords = parsePoint(p.point);

          extracted.push({
            lat: coords.lat,
            lon: coords.lon,
            time: p.time
          });
        });
      });

      onLocationsLoaded(extracted);
    };

    reader.readAsText(file);
  };

  return <input type="file" accept=".json" onChange={handleFileUpload} />;
}

export default FileUpload;