import styled from "styled-components";

import React from "react";

const StyledImage = styled.img`
  max-width: 400px;
`;

const ArticleImage = ({ title, source }) => {
  return (
    <StyledImage
      alt={`Illustration de l'article ${title}`}
      src={source}
      className="mx-auto mb-3"
    />
  );
};

export default ArticleImage;
