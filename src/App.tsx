import { useState } from "react";
import UploadJSON from "./components/UploadJSON";
import { processLocations } from "./utils/process";
import type { LocationPoint } from "./types/types";

function App() {

  const [locations, setLocations] = useState<LocationPoint[]>([]);

  function handleLocationsLoaded(data: LocationPoint[]) {

    setLocations(data);
  }

  const countryStats = processLocations(locations);

  return (
    <div>
      <h1>Location Viewer</h1>

      <UploadJSON onLocationsLoaded={handleLocationsLoaded} />
      <ul>
        {countryStats.map((c) => (
          <li key={c.country}>
            {c.country}: {c.percentage}%
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;