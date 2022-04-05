import React, { useState } from "react";

const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result);
  };

  return (
    <div>
      {preview ? (
        <img src={preview} alt="profil" className="img-fluid mt-3" />
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default PreviewImage;
