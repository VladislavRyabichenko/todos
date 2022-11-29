import React from 'react';
import styled from 'styled-components';
import { baseTheme } from '../../../styles/theme';

type StyledCheckboxPropsType = {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  checkedDefault?: boolean;
  onClick?: any;
  checked?: boolean;
  icon?: JSX.Element;
  checkedIcon?: JSX.Element;
  role?: string;
  children?: JSX.Element;
};

const getChildren = (icon: any, checkedIcon: any, checked: any) => {
  return checked ? checkedIcon : icon;
};

const StyledCheckbox = styled.div.attrs<StyledCheckboxPropsType>((props) => ({
  onClick: props.onClick || null,
  children: getChildren(props.icon, props.checkedIcon, props.checked),
}))<StyledCheckboxPropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};

  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0 10px'};
  //outline: 3px solid whitesmoke;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: ${baseTheme.colors.success};
  letter-spacing: 1px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const CheckboxWithIcons = (props: StyledCheckboxPropsType) => {
  return <StyledCheckbox {...props} />;
};

export default CheckboxWithIcons;
