import React, { FC } from 'react';
import styled from 'styled-components';

const StyledInfoPanel = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 2;
  padding: 20px;
  border: 2px solid rgba(0,0,0,0.2);
  border-radius: 4px;
  background-clip: padding-box;
  background-color: white;
`;

const StyledInfoPanelTitle = styled.h2`
  margin-bottom: 10px;
`;

const InfoPanel: FC = () => {
  return(
    <StyledInfoPanel>
      <StyledInfoPanelTitle>Liège</StyledInfoPanelTitle>
      <p>352 avis</p>
    </StyledInfoPanel>
  );
};

export default InfoPanel;