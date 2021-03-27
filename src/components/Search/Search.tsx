import React, { FC, useState, useEffect } from 'react';
import { LatLngExpression } from 'leaflet';
import styled from 'styled-components';
import { GeocodingSuggestion } from '../../interfaces';
import { SearchProps } from '../../interfaces';

const StyledSearchWrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 2;
`;

const StyledSearchInput = styled.input`
  border: 2px solid rgba(0,0,0,0.2);
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 15px;
  width: 250px;
  background-clip: padding-box;

  &:focus {
    outline: none;
  }
`;

const StyledSuggestions = styled.div`
  width: 250px;
  border: 2px solid rgba(0,0,0,0.2);
  background-clip: padding-box;
  border-radius: 4px;
  background-color: white;
  margin-top: 10px;
  font-family: sans-serif;
`;

const StyledSuggestion = styled.p`
  border-bottom: 1px solid #ccc;
  margin: 0;
  padding: 10px 15px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #e9e9e9;
  }
`;

const Search: FC<SearchProps> = ({onCitySelect}) => {
  const [suggestions, setSuggestions] = useState<GeocodingSuggestion[]>([]);
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    if(value !== '') {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&country=BE`).then((res: Response) => {
        return res.json();
      }).then((data: any) => {
        if(data.features) {
          const newSuggestion: GeocodingSuggestion[] = data.features.map((item:any) => {
            return {
              name: item.place_name,
              center: [item.center[1], item.center[0]],
            }
          });

          // console.log(newSuggestion);
          setSuggestions([...newSuggestion]);
        }
      }).catch((error: any) => {
        console.log(error)
      });
    }
  }, [value]);

  const handleSelect = ((center: LatLngExpression) => {
    // console.log(center);
    onCitySelect(center);
    setValue('');
    setSuggestions([]);
  });

  return(
    <StyledSearchWrapper>
      <StyledSearchInput 
        type="text"
        name="place"
        id="place"
        value={value}
        onChange={(e) => {setValue(e.target.value)}}
        autoComplete="off"
        placeholder="Cherchez votre ville..." />

      {suggestions.length > 0 &&
        <StyledSuggestions>
          {suggestions.map((suggestion: GeocodingSuggestion) => {
            return(
              <StyledSuggestion key={suggestion.name} onClick={() => {handleSelect(suggestion.center)}}>{suggestion.name}</StyledSuggestion>
            );
          })}   
        </StyledSuggestions>
      }
    </StyledSearchWrapper>
  );
};

export default Search;