import { LatLngTuple } from 'leaflet';
import React, { useState, useEffect } from 'react';
import Map from './components/Map/Map';
import Search from './components/Search/Search';
import InfoPanel from './components/InfoPanel/InfoPanel';

const App = () => {
  const [position, setPosition] = useState<LatLngTuple>([50.6337, 5.56759]);
  const [boundaries, setBoundaries] = useState<LatLngTuple[]>([]);
  const [places, setPlaces] = useState([]);
  const [showAllPlaces, setShowAllPlaces] = useState<boolean>(true);

  /** Fetch all the cities on first load. */
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/places`).then((res) => {
      return res.json();
    }).then((data) => {
      setPlaces(data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  /** Set the data for one city. */
  const onCitySelect = (center: LatLngTuple, polygon: LatLngTuple[]) => {
    setShowAllPlaces(false);
    setPosition(center);
    setBoundaries(polygon);
  };

  return (
    <div>
      <Map position={position} boundaries={boundaries} places={places} showAllPlaces={showAllPlaces} />
      <Search onCitySelect={(center: LatLngTuple, polygon: LatLngTuple[]) => {onCitySelect(center, polygon)}} />
      <InfoPanel />
    </div>
  );
};

export default App;