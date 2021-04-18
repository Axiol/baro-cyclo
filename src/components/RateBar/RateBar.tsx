import React, { FC } from 'react';
import styled from 'styled-components';
import { RateBarProps } from '../../interfaces';

const StyledBar = styled.div<{big: boolean | undefined}>`
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 3px;
  background: rgb(167,0,0);
  background: linear-gradient(90deg, rgba(167,0,0,1) 0%, rgba(212,104,15,1) 50%, rgba(61,173,29,1) 100%);;
  margin-top: 7px;

  ${props => props.big && `
    height: 20px;
    border-radius: 4px;
  `}
`;

const StyledCursor = styled.div<{big: boolean | undefined}>`
  position: absolute;
  top: -5px;
  left: 0;
  width: 8px;
  height: 20px;
  border-radius: 10px;
  background-color: blue;

  ${props => props.big && `
    width: 11px;
    height: 30px;
    border-radius: 4px;
  `}
`;

const RateBar: FC<RateBarProps> = ({big}) => {
  return(
    <StyledBar big={big}>
      <StyledCursor big={big} />
    </StyledBar>    
  );
};

export default RateBar;