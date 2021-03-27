import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
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

const Map: FC<MapProps> = ({position}) => {
  const UseMapComponent = () => {
    const map = useMap();
    
    useEffect(() => {
      map.setView(position, map.getZoom(), {
        animate: true,
      });
    });

    return null;
  }

  return(
    <StyledMapContainer center={position} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        maxZoom={18}
        id='mapbox/streets-v11'
        tileSize={512}
        zoomOffset={-1}
        accessToken={process.env.REACT_APP_MAPBOX_KEY}
        url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}'
      />

      <UseMapComponent />
    </StyledMapContainer>
  );
};

export default Map;