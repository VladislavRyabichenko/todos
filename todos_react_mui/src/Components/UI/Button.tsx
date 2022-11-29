import React from 'react';
import styled from 'styled-components';
import { baseTheme } from '../../../styles/theme';

type StyledButtonPropsType = {
  type?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  text?: string;
  backgroundColor?: string;
  icon?: JSX.Element;
  disabled?: boolean;
  onClick?: any;
  children?: JSX.Element;
};

const StyledButton = styled.input.attrs<StyledButtonPropsType>((props) => ({
  type: props.type || 'submit',
  value: props.text || 'BUTTON',
  disabled: props.disabled || false,
  children: props.icon || null,
  onClick: props.onClick || null,
}))<StyledButtonPropsType>`
  border: none;
  border-radius: 5px;

  background-color: ${(props) => props.backgroundColor || baseTheme.colors.secondary.dark};
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};

  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};

  &:hover {
    cursor: pointer;
    background: ${baseTheme.colors.secondary.light};
  }
  &:disabled {
    background: ${baseTheme.colors.secondary.light};
    cursor: not-allowed;
    &:hover {
    }
  }
`;

const Button = (props: StyledButtonPropsType) => {
  return <StyledButton {...props} />;
};

export default Button;
