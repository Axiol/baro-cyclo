import { LatLngTuple } from 'leaflet';
import React, { useState } from 'react';
import Map from './components/Map/Map';
import Search from './components/Search/Search';

const App = () => {
  const [position, setPosition] = useState<LatLngTuple>([50.6337, 5.56759]);
  const [boundaries, setBoundaries] =useState<LatLngTuple[]>([]);

  const onCitySelect = (center: LatLngTuple, polygon: LatLngTuple[]) => {
    // console.log(polygon);
    setPosition(center);
    setBoundaries(polygon);
  };

  return (
    <div>
      <Map position={position} boundaries={boundaries} />
      <Search onCitySelect={(center: LatLngTuple, polygon: LatLngTuple[]) => {onCitySelect(center, polygon)}} />
    </div>
  );
};

export default App;