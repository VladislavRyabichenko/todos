import React from 'react';
import styled from 'styled-components';

type StyledFlexPropsType = {
  width?: string;
  height?: string;
  direction?: string;
  align?: string;
  justify?: string;
  margin?: string;
  gap?: string;
  ref?: any;
  children?: JSX.Element | JSX.Element[];
};

const StyledFlex = styled.div<StyledFlexPropsType>`
  //background: red;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  align-items: ${(props) => props.align || 'none'};
  gap: ${(props) => props.gap || '10px'};
  justify-content: ${(props) => props.justify || 'none'};
  margin: ${({ margin }) => margin || '0'};
`;

const Flex = (props: StyledFlexPropsType) => {
  return <StyledFlex {...props} />;
};

export default Flex;
