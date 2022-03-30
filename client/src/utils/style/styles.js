import styled from "styled-components";
import colors from "./colors";

export const PrimaryButton = styled.button`
  min-width: 180px;
  background-color: ${colors.primary};
  border: 2px solid transparent;
  &:hover {
    background-color: white;
    color: ${colors.secondaryDark};
    border-color: ${colors.secondaryDark};
    text-decoration: none;
  }
`;
