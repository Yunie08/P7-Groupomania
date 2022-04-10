import styled from "styled-components";

import React from "react";

const ImageContainer = styled.div`
  max-width: 400px;
`;

const ArticleImage = ({ title, source }) => {
  return (
    <ImageContainer className="mx-auto mb-3">
      <img
        alt={`Illustration de l'article ${title}`}
        src={source}
        className="img-fluid"
      />
    </ImageContainer>
  );
};

export default ArticleImage;
