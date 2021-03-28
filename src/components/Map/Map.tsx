import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, useMap, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapProps } from '../../interfaces';

const StyledMapContainer = styled(MapContainer) `
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const Map: FC<MapProps> = ({position, boundaries}) => {
  const UseMapComponent = () => {
    const map = useMap();
    
    useEffect(() => {
      map.setView(position, 12, {
        animate: true,
      });
    });

    return null;
  }

  const purpleOptions = { color: 'purple' }

  return(
    <StyledMapContainer center={position} zoom={12} scrollWheelZoom={true} zoomControl={false}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        maxZoom={18}
        id='mapbox/dark-v10'
        tileSize={512}
        zoomOffset={-1}
        accessToken={process.env.REACT_APP_MAPBOX_KEY}
        url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
      />

      <UseMapComponent />

      {boundaries !== [] &&
        <Polygon pathOptions={purpleOptions} positions={boundaries} />
      }
    </StyledMapContainer>
  );
};

export default Map;