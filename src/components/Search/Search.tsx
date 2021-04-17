// import { LatLngTuple } from 'leaflet';
import React, { FC, useState, useEffect } from 'react';
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

const StyledSuggestion = styled.p<{highlighted: boolean}>`
  border-bottom: 1px solid #ccc;
  margin: 0;
  padding: 10px 15px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #ccc;
  }

  ${props => props.highlighted && `
    background-color: #ccc;
  `}
`;

const Search: FC<SearchProps> = ({onCitySelect}) => {
  const [highlight, setHighlight] = useState<number>(-1);
  const [suggestions, setSuggestions] = useState<GeocodingSuggestion[]>([]);
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    if(value !== '') {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/places/search/${value}`).then((res: Response) => {
        return res.json();
      }).then((data: any) => {
        setSuggestions([...data]);
      }).catch((error: any) => {
        console.log(error)
      });
    }
  }, [value]);

  const handleKeypress = ((e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight(highlight - 1 < 0 ? 0 : highlight - 1);
    }
    if(e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight(highlight + 1 > suggestions.length - 1 ? suggestions.length - 1 : highlight + 1);
    }
    if(e.key === 'Enter') {
      handleSelect(suggestions[highlight]);
    }
  });

  const handleSelect = ((place: GeocodingSuggestion) => {
    console.log(place);
    onCitySelect(place.center, place.borders);
    setValue('');
    setSuggestions([]);
    setHighlight(-1);
  });

  return(
    <StyledSearchWrapper>
      <StyledSearchInput 
        type="text"
        name="place"
        id="place"
        value={value}
        onKeyDown={(e) => {handleKeypress(e)}}
        onChange={(e) => {setValue(e.target.value); setHighlight(-1)}}
        autoComplete="off"
        placeholder="Cherchez votre ville..." />

      {suggestions.length > 0 &&
        <StyledSuggestions>
          {suggestions.map((suggestion: GeocodingSuggestion, index:number) => {
            return(
              <StyledSuggestion 
                key={suggestion.name}
                highlighted={highlight === index ? true : false}
                onClick={() => {handleSelect(suggestion)}}
                onMouseOver={() => {setHighlight(-1)}}>
                {suggestion.name}
               </StyledSuggestion>
            );
          })}   
        </StyledSuggestions>
      }
    </StyledSearchWrapper>
  );
};

export default Search;