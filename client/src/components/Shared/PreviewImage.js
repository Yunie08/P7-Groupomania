import React, { useState, useEffect } from "react";

import { ProfilePic } from "../../utils/style/styles";

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
    <ProfilePic
      $profile
      src={preview}
      alt="Aperçu photo de profil"
      className="rounded-circle mt-3"
    />
  );
};

export default PreviewImage;
