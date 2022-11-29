import React from 'react';
import styled from 'styled-components';

type StyledAvatarPropsType = {
  backGround?: string;
  width?: number;
  height?: number;
  url?: string;
  children?: JSX.Element; //any;
};

const StyledAvatar = styled.div<StyledAvatarPropsType>`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  align-items: center;

  background: ${(props) => props.backGround || 'white'};
  width: ${(props) => props.width || 40}px;
  height: ${(props) => props.height || 40}px;
`;

const Avatar = (props: StyledAvatarPropsType) => {
  return <StyledAvatar {...props} />;
};

export default Avatar;
