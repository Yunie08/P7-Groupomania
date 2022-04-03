import React, { useState, useEffect } from "react";
import axios from "../utils/api/axiosConfig";

import Collapse from "react-bootstrap/Collapse";
import Comment from "./Comment";
import { LinkStyledButton } from "../utils/style/styles";

const ARTICLE_URL = "/article";

const ToggleComments = ({ setCommentRefresh, commentRefresh, articleId }) => {
  const [open, setOpen] = useState(false);
  const [isDataLoading, setDataLoading] = useState();
  const [error, setError] = useState(false);
  const [commentsList, setCommentsList] = useState([]);
  const token = localStorage.getItem("token");

  const getComments = async () => {
    setDataLoading(true);
    try {
      const response = await axios.get(`${ARTICLE_URL}/${articleId}/comment`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentsList(response.data);
      console.log("On est dans le toggleComments");
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setDataLoading(false);
    }
  };

  // If new comment added, show comments
  useEffect(() => {
    getComments();
    !open && commentRefresh && setOpen(true);
  }, [commentRefresh]);

  return (
    <React.Fragment>
      <LinkStyledButton
        onClick={() => setOpen(!open)}
        aria-controls="comments"
        aria-expanded={open}
      >
        <i className="fa-solid fa-comments fa-lg"></i>2 commentaires
      </LinkStyledButton>
      <Collapse in={open} onEnter={getComments} mountOnEnter={true}>
        <div id="comments">
          {commentsList.map((comment) => (
            <Comment
              setCommentRefresh={setCommentRefresh}
              key={`comment-${comment.id}`}
              data={comment}
            />
          ))}
        </div>
      </Collapse>
    </React.Fragment>
  );
};

export default ToggleComments;
