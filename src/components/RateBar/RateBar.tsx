import React, { FC } from 'react';
import styled from 'styled-components';

const StyledBar = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 3px;
  background: rgb(167,0,0);
  background: linear-gradient(90deg, rgba(167,0,0,1) 0%, rgba(212,104,15,1) 50%, rgba(61,173,29,1) 100%);;
  margin-top: 7px;
`;

const StyledCursor = styled.div`
  position: absolute;
  top: -5px;
  left: 0;
  width: 8px;
  height: 20px;
  border-radius: 10px;
  background-color: blue;
`;

const RateBar: FC = () => {
  return(
    <StyledBar>
      <StyledCursor />
    </StyledBar>    
  );
};

export default RateBar;