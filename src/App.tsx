import { useState } from "react";
import UploadJSON from "./components/UploadJSON";
import { processLocations } from "./utils/process";
import type { LocationPoint } from "./types/types";

function App() {

  const [locations, setLocations] = useState<LocationPoint[]>([]);

  function handleLocationsLoaded(data: LocationPoint[]) {

    setLocations(data);

    processLocations(data); 

  }

  return (
    <div>
      <h1>Location Viewer</h1>

      <UploadJSON onLocationsLoaded={handleLocationsLoaded} />

      <p>{locations.length} locations loaded</p>
    </div>
  );
}

export default App;