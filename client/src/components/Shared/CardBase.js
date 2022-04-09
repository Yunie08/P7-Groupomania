import styled from "styled-components";
import Card from "react-bootstrap/Card";

export const MainCard = styled(Card)`
  max-width: ${(props) => (props.auth ? "900px" : "700px")};
`;

const CardBase = ({ children }) => {
  return (
    <MainCard className="my-5 col-md-9 col-lg-8 rounded-3 shadow px-md-2 py-2">
      <Card.Body className="bg-white position-relative">{children}</Card.Body>
    </MainCard>
  );
};

export default CardBase;
