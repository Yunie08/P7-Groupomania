import { createGlobalStyle } from "styled-components";
import colors from "./colors";
import backgroundIcon from "../../assets/icon.svg";

const StyledGlobalStyle = createGlobalStyle`
body {
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
   url(${backgroundIcon}) no-repeat;
  background-position: bottom -300px right -300px;
  background-attachment: fixed;

  min-height: 100vh;

  font-family: "TruenoLight", Arial, Helvetica, sans-serif;
  color: ${colors.primary};
}

h1 {
  text-align: center;
  margin-top : 50px;
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
