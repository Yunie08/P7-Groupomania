import { createGlobalStyle } from "styled-components";
import colors from "./colors";
import backgroundIcon from "../../assets/icon.svg";

const StyledGlobalStyle = createGlobalStyle`

body {
  min-height: 100vh;
  font-family: "TruenoLight", Arial, Helvetica, sans-serif;
  color: ${colors.primary};
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
   url(${backgroundIcon}) no-repeat;
  background-position: bottom -300px right -300px;
  background-attachment: fixed;
}

h1 {
  text-align: center;
  margin-top : 50px;
}

h2 {
  font-size: 1.4em;
  font-weight: 600;
}
h3 {
  font-size: 1.1em;
  font-weight: 600;
}

a {
  text-decoration: none !important;
}

i {
  padding-right: 5px;
}
`;

function GlobalStyle() {
  return <StyledGlobalStyle />;
}

export default GlobalStyle;
