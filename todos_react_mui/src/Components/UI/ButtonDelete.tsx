import React from 'react';
import styled from 'styled-components';
import { baseTheme } from '../../../styles/theme';

type StyledButtonDeletePropsType = {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  text?: string;
  onClick?: any;
  backgroundColor?: string;
  icon?: JSX.Element;
  disabled?: boolean;
  children?: JSX.Element;
};

const getChildren = (text: string, icon: any) => {
  if (icon) return icon;
  if (text) return <span>{text}</span>;
  return <span>Delete</span>;
};

const StyledButtonDelete = styled.div.attrs<StyledButtonDeletePropsType>((props) => ({
  disabled: props.disabled || false,
  children: getChildren(props.text, props.icon),
  onClick: props.onClick || null,
}))<StyledButtonDeletePropsType>`
  border: none;
  background-color: ${(props) => props.backgroundColor || baseTheme.colors.secondary.dark};
  border-radius: 5px;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};

  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};

  display: flex;
  align-items: center;
  justify-content: center;
  color: ${baseTheme.colors.textColors.root};
  &:hover {
    cursor: pointer;
  }
`;

const Button = (props: StyledButtonDeletePropsType) => {
  return <StyledButtonDelete {...props} />;
};

export default Button;
