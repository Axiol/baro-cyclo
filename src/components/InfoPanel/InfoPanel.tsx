import React, { FC } from 'react';
import styled from 'styled-components';
import RateBar from '../RateBar/RateBar';

const StyledInfoPanel = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 2;
  width: 475px;
  padding: 20px;
  border: 2px solid rgba(0,0,0,0.2);
  border-radius: 4px;
  background-clip: padding-box;
  background-color: white;
`;

const StyledInfoPanelTitle = styled.h2`
  margin-bottom: 10px;
`;

const StyledSectionsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 15px -5px -20px -5px;
`;

const StyledSection = styled.li`
  width: calc(50% - 10px);
  margin: 0 5px 20px 5px;
`;

const StyledSectionTitle = styled.h3`
  font-weight: bold;
`;

const InfoPanel: FC = () => {
  return(
    <StyledInfoPanel>
      <StyledInfoPanelTitle>Liège</StyledInfoPanelTitle>
      <p>352 avis</p>
      <StyledSectionsList>
        <StyledSection>
          <StyledSectionTitle>Section avis</StyledSectionTitle>
          <RateBar />
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Section avis</StyledSectionTitle>
          <RateBar />
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Section avis</StyledSectionTitle>
          <RateBar />
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Section avis</StyledSectionTitle>
          <RateBar />
        </StyledSection>
        <StyledSection>
          <StyledSectionTitle>Section avis</StyledSectionTitle>
          <RateBar />
        </StyledSection>
      </StyledSectionsList>
    </StyledInfoPanel>
  );
};

export default InfoPanel;