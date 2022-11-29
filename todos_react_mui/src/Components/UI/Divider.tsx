import React from 'react';
import styled from 'styled-components';

type DividerProps = {
  height?: number;
};

export const Divider = styled.div<DividerProps>`
  height: ${({ height = 8 }) => height}px;
  background: black;
`;
