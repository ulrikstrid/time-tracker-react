import * as React from "react";
import styled from "styled-components";

export const Button = styled.button`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  width: 120px;
  height: 40px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
`;

const IconButtonStyled = styled(Button)`
  width: 35px;
  height: 35px;
  padding: 5px;
`;

interface SvgObjectProps {
  src: string;
}

const SvgObject = styled.div`
  background: url(${(props: SvgObjectProps) => props.src});
  width: 23px;
  height: 23px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

export const IconButton = (props: any) =>
  <IconButtonStyled {...props}>
    <SvgObject src={props.src} />
  </IconButtonStyled>;
