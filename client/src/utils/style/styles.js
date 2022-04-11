import styled from "styled-components";
import colors from "./colors";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const primaryColor = colors.primary;
const secondaryDarkColor = colors.secondaryDark;

export const MainCard = styled(Card)`
  max-width: ${(props) => (props.auth ? "900px" : "700px")};
`;

export const StyledButton = styled(Button)`
  text-decoration: none;
  min-width: 180px;
  max-width: ${(props) => props.$modal && "160px"};
  color: ${(props) => props.$outline && "inherit"};
  background-color: ${(props) =>
    props.$outline ? "transparent" : primaryColor};
  background-color: ${(props) => props.$danger && secondaryDarkColor};
  border: 2px solid;
  border-color: ${(props) => (props.$outline ? primaryColor : "transparent")};
  &:hover {
    background-color: white;
    color: ${secondaryDarkColor};
    border-color: ${secondaryDarkColor};
    text-decoration: none;
  }
  &:focus {
    &:not(:hover) {
      background-color: ${(props) =>
        props.$outline ? "transparent" : primaryColor};
      border-color: ${primaryColor};
      color: ${(props) => props.$outline && primaryColor};
    }
  }
`;

export const LinkStyledButton = styled.button`
  border: none;
  background: transparent;
  color: ${(props) => (props.likedByUser ? secondaryDarkColor : "inherit")};
  &:hover {
    color: ${colors.secondaryDark};
    text-decoration: underline;
  }
`;
