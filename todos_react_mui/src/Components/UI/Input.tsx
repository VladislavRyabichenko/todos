import React from 'react';
import styled from 'styled-components';
import { baseTheme } from '../../../styles/theme';

type StyledInputPropsType = {
  type?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  isRequired?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: any;
  onBlur?: any;
  role?: string;
  children?: JSX.Element | JSX.Element[];
};

const getPlaceHolder = (placeholder: string | undefined, isRequired: boolean | undefined) => {
  if (placeholder && isRequired) {
    return placeholder.concat('*');
  }
  if (placeholder && !isRequired) {
    return placeholder;
  }
  if (!placeholder && isRequired) {
    return '*';
  }
  if (!placeholder && !isRequired) {
    return '';
  }
};

const StyledInput = styled.input.attrs<StyledInputPropsType>((props) => ({
  type: props.type || 'text',
  placeholder: getPlaceHolder(props.placeholder, props.isRequired),
  onChange: props.onChange || null,
  onBlur: props.onBlur || null,
}))<StyledInputPropsType>`

  border: none;
  

  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};

  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0 10px'};
  //outline: 3px solid whitesmoke;
  background: ${baseTheme.colors.secondary.root};
  background: whitesmoke;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  color: ${baseTheme.colors.textColors.dark};
  letter-spacing: 1px;

  border-radius: 5px;
  &:focus {
    border-bottom: 7px solid ${baseTheme.colors.primary.root};
    color: #333333;
    //background: rgba(255, 53, 127, 1);
    //color: whitesmoke;
`;

const Input = (props: StyledInputPropsType) => {
  return <StyledInput {...props} />;
};

export default Input;
