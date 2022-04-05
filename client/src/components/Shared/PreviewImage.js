import React, { useState } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  max-width: 400px;
`;

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <div className="d-flex justify-content-center">
      {preview ? (
        <StyledImage src={preview} alt="profil" className=" mt-3" />
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default PreviewImage;
