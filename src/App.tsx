import { LatLngExpression } from 'leaflet';
import React, { useState } from 'react';
import Map from './components/Map/Map';
import Search from './components/Search/Search';

const App = () => {
  const [position, setPosition] = useState<LatLngExpression>([50.6337, 5.56759]);

  const onCitySelect = (center: LatLngExpression) => {
    // console.log(center);
    setPosition(center);
  };

  return (
    <div>
      <Map position={position} />
      <Search onCitySelect={(center: LatLngExpression) => {onCitySelect(center)}} />
    </div>
  );
};

export default App;