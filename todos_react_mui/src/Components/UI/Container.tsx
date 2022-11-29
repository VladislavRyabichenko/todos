import React from 'react';
import styled from 'styled-components';
import { baseTheme } from '../../../styles/theme';

type StyledContainerPropsType = {
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  maxWidth?: string;
  maxHeight?: string;
  margin?: string;
  padding?: string;
  backgroundColor?: string;
  children?: JSX.Element | JSX.Element[];
};

const StyledContainer = styled.div<StyledContainerPropsType>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'none'};
  max-width: ${(props) => props.maxWidth || 'none'};
  max-height: ${(props) => props.maxHeight || 'none'};
  min-width: ${(props) => props.minWidth || 'none'};
  min-height: ${(props) => props.minHeight || 'none'};
  background-color: ${(props) => props.backgroundColor || baseTheme.colors.primary.light};

  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};

  border-radius: 5px;
`;

const Container = (props: StyledContainerPropsType) => {
  return <StyledContainer {...props} />;
};

export default Container;
