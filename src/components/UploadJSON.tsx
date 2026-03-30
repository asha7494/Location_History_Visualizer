import { useState } from "react";

type LocationPoint = {
  lat: number
  lon: number
  time: string
};

function FileUpload() {
  const [locations, setLocations] = useState<LocationPoint[]>([]);

  function parsePoint(point: string) {
    const [lat, lon] = point
      .replace(/°/g, "")
      .split(",")
      .map((v) => parseFloat(v.trim()));

    return { lat, lon };
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
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

        setLocations(extracted);
        console.log("Locations:", extracted);

      } catch (err) {
        console.error("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>

      <input type="file" accept=".json" onChange={handleFileUpload} />

      <p>{locations.length} locations loaded</p>

      <ul>
        {locations.map((loc, i) => (
          <li key={i}>
            {loc.time} — {loc.lat}, {loc.lon}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default FileUpload;