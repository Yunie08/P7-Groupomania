import Spinner from "react-bootstrap/Spinner";

import React from "react";

const Loader = () => {
  return (
    <Spinner animation="border" role="statut" className="m-5">
      <span className="visually-hidden">Chargement en cours...</span>
    </Spinner>
  );
};

export default Loader;
