import { useState, useEffect } from "react";
import styled from "styled-components";

// Components
import Loader from "./Loader";

const PreviewImage = ({ file, src }) => {
  const [preview, setPreview] = useState(src);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
        setIsLoading(false);
      };
    }
  }, [file]);

  return (file || src) && !isLoading ? (
    <img src={preview} alt="Aperçu" className="img-fluid" />
  ) : (
    <Loader />
  );
};

export default PreviewImage;
