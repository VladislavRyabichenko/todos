import React from 'react';
import styled from 'styled-components';
import { baseTheme } from '../../../styles/theme';

type StyledTextFieldPropsType = {
  type?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  isRequired?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
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

const StyledInput = styled.input.attrs<StyledTextFieldPropsType>((props) => ({
  type: props.type || 'text',
  placeholder: getPlaceHolder(props.placeholder, props.isRequired),
  onChange: props.onChange || null,
  onBlur: props.onBlur || null,
  defaultValue: props.defaultValue || '',
}))<StyledTextFieldPropsType>`
  border: none;

  outline: none;

  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};

  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0 10px'};
  //outline: 3px solid whitesmoke;
  background: ${baseTheme.colors.secondary.root};
  border-bottom: 1px solid gray;

  background: white;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: ${baseTheme.colors.textColors.dark};
  letter-spacing: 1px;

  text-align: center;

  &:hover {
    border-bottom: 2px solid gray;
    color: #333333;
    //background: rgba(255, 53, 127, 1);
    //color: whitesmoke;
  }

  &:focus {
    border-bottom: 2px solid ${baseTheme.colors.alternative.dark};
    color: #333333;
    //background: rgba(255, 53, 127, 1);
    //color: whitesmoke;
  }

  &:disabled {
    border-bottom: 1px dotted gray;
    text-decoration: line-through;
    &:hover {
      cursor: not-allowed;
      color: gray;
      border-bottom: 1px dotted gray;
    }
  }
`;

const TextField = (props: StyledTextFieldPropsType) => {
  return <StyledInput {...props} />;
};

export default TextField;
