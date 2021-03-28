import { LatLngTuple } from 'leaflet';
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
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&country=BE&types=place`).then((res: Response) => {
        return res.json();
      }).then((data: any) => {
        if(data.features) {
          const newSuggestion: GeocodingSuggestion[] = data.features.map((item:any) => {
            // console.log(item);
            return {
              id: item.id,
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
      // console.log(suggestions[highlight]);
      handleSelect(suggestions[highlight]);
    }
  });

  const handleSelect = ((place: GeocodingSuggestion) => {
    const center = place.center.toString().split(',');
    let polygon: LatLngTuple[] = [];
    fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${center[0]}&lon=${center[1]}&zoom=10&format=jsonv2`).then((res: Response) => {
      return res.json();
    }).then((data: any) => {
      // console.log(data.place_id);
      fetch(`https://nominatim.openstreetmap.org/details.php?place_id=${data.place_id}&addressdetails=1&hierarchy=0&group_hierarchy=1&polygon_geojson=1&format=json`).then((res2: Response) => {
        return res2.json();
      }).then((data2: any) => {
        // console.log(data2);
        polygon = data2.geometry.coordinates[0];

        // console.log(polygon);
        const sortedPolygon: LatLngTuple[] = polygon.map((item) => {
          return [item[1], item[0]];
        });
        // console.log(sortedPolygon);

        onCitySelect(place.center, sortedPolygon);
        setValue('');
        setSuggestions([]);
        setHighlight(-1);
      }).catch((error2: any) => {
        console.log(error2);
      });
    }).catch((error: any) => {
      console.log(error);
    });
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