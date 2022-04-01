import React, { useState } from "react";
import styled from "styled-components";
import colors from "../utils/style/colors";

import Collapse from "react-bootstrap/Collapse";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Comment from "./Comment";
import { LinkStyledButton } from "../utils/style/styles";

const ToggleComments = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <LinkStyledButton
        onClick={() => setOpen(!open)}
        aria-controls="comments"
        aria-expanded={open}
      >
        <i className="fa-solid fa-comments fa-lg"></i>2 commentaires
      </LinkStyledButton>
      <Collapse in={open}>
        <div id="comments">
          <Comment />
          <Comment />
          <Comment />
        </div>
      </Collapse>
    </React.Fragment>
  );
};

export default ToggleComments;
