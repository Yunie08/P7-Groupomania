import { useState, useEffect } from "react";
import styled from "styled-components";

const StyledImage = styled.img`
  max-width: 400px;
`;

const PreviewImage = ({ file, src }) => {
  const [preview, setPreview] = useState(src);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
      };
    }
  }, [file]);

  return (
    (file || src) && (
      <StyledImage src={preview} alt="Aperçu" className="img-fluid" />
    )
  );
};

export default PreviewImage;
